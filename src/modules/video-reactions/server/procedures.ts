import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { z } from 'zod';
import { db } from '@/db';
import { videoReactions } from '@/db/schema';
import { and, eq } from 'drizzle-orm/sql/expressions/conditions';

export const videoReactionsRouter = createTRPCRouter({
  like: protectedProcedure
    .input(z.object({ videoId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      const { videoId } = input;
      const { id: userId } = ctx.user;
      const [existingVideoReactionLike] = await db
        .select()
        .from(videoReactions)
        .where(
          and(
            eq(videoReactions.videoId, videoId),
            eq(videoReactions.userId, userId),
            eq(videoReactions.type, 'like')
          )
        );

      if (existingVideoReactionLike) {
        const [deletedViewerReactions] = await db
          .delete(videoReactions)
          .where(
            and(
              eq(videoReactions.userId, userId),
              eq(videoReactions.videoId, videoId)
            )
          )
          .returning();
        return deletedViewerReactions;
      }

      const [createdVideoReaction] = await db
        .insert(videoReactions)
        .values({ userId, videoId, type: 'like' })
        .onConflictDoUpdate({
          target: [videoReactions.userId, videoReactions.videoId],
          set: {
            type: 'like',
          },
        })
        .returning();

      return createdVideoReaction;
    }),
  disLike: protectedProcedure
    .input(z.object({ videoId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      const { videoId } = input;
      const { id: userId } = ctx.user;
      const [existingVideoReactiondisLike] = await db
        .select()
        .from(videoReactions)
        .where(
          and(
            eq(videoReactions.videoId, videoId),
            eq(videoReactions.userId, userId),
            eq(videoReactions.type, 'disLike')
          )
        );

      if (existingVideoReactiondisLike) {
        const [deletedViewerReactions] = await db
          .delete(videoReactions)
          .where(
            and(
              eq(videoReactions.userId, userId),
              eq(videoReactions.videoId, videoId)
            )
          )
          .returning();
        return deletedViewerReactions;
      }

      const [createdVideoReaction] = await db
        .insert(videoReactions)
        .values({ userId, videoId, type: 'disLike' })
        .onConflictDoUpdate({
          target: [videoReactions.userId, videoReactions.videoId],
          set: {
            type: 'disLike',
          },
        })
        .returning();

      return createdVideoReaction;
    }),
});
