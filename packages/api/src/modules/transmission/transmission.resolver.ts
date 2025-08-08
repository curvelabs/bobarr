import { Resolver, Query, Args } from '@nestjs/graphql';
import { map } from 'p-iteration';

import { TorrentDAO } from 'src/entities/dao/torrent.dao';

import { TorrentStatus, GetTorrentStatusInput } from './transmission.dto';
import { TransmissionService } from './transmission.service';

@Resolver()
export class TransmissionResolver {
  public constructor(
    private readonly torrentDAO: TorrentDAO,
    private readonly transmissionService: TransmissionService
  ) {}

  @Query((_returns) => [TorrentStatus])
  public getTorrentStatus(
    @Args('torrents', { type: () => [GetTorrentStatusInput] })
    torrents: GetTorrentStatusInput[]
  ) {
    return map(torrents, async ({ resourceId, resourceType }) => {
      const torrent = await this.torrentDAO.findOneOrFail({
        where: { resourceId, resourceType },
      });

      const torrentStatus = await this.transmissionService.getTorrent(
        torrent.torrentHash
      );

      return { ...torrentStatus, resourceId, resourceType };
    });
  }

  @Query((_returns) => [TorrentStatus])
  public async getMultiTorrentStatus(
    @Args('torrents', { type: () => [GetTorrentStatusInput] })
    torrents: GetTorrentStatusInput[]
  ) {
    const torrentStatuses = await map(
      torrents,
      async ({ resourceId, resourceType }) => {
        const torrent = await this.torrentDAO.findOneOrFail({
          where: { resourceId, resourceType },
        });

        return { torrent, resourceId, resourceType };
      }
    );

    const torrentHashes = torrentStatuses.map((t) => t.torrent.torrentHash);

    const {
      torrents: torrentInfos,
    } = await this.transmissionService.getTorrents(torrentHashes);

    return torrentStatuses.map((torrentStatus) => {
      const torrentInfo = torrentInfos.find(
        (ti) => ti.hashString === torrentStatus.torrent.torrentHash
      );

      return {
        ...torrentInfo,
        resourceId: torrentStatus.resourceId,
        resourceType: torrentStatus.resourceType,
      };
    });
  }
}
