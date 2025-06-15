import { Button } from '@/components/ui/button';
import { ThumbsUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { VideoGetOneOutput } from '@/modules/videos/types';
import { useClerk } from '@clerk/nextjs';
import { trpc } from '@/trpc/client';
import { toast } from 'sonner';

interface VideoReactionsProps {
  videoId: string;
  likes: number;
  disLikes: number;
  viewerReactions: VideoGetOneOutput['viewerReactions'];
}

export const VideoReactions = ({
  videoId,
  likes,
  disLikes,
  viewerReactions,
}: VideoReactionsProps) => {
  const clerk = useClerk();
  const utils = trpc.useUtils();
  const like = trpc.videoReactions.like.useMutation({
    onSuccess: () => {
      utils.videos.getOne.invalidate({ id: videoId });
    },
    onError: (error) => {
      toast.error('Something went wrong');
      if (error.data?.code === 'UNAUTHORIZED') {
        clerk.openSignIn();
      }
    },
  });
  const disLike = trpc.videoReactions.disLike.useMutation({
    onSuccess: () => {
      utils.videos.getOne.invalidate({ id: videoId });
    },
    onError: (error) => {
      toast.error('Something went wrong');
      if (error.data?.code === 'UNAUTHORIZED') {
        clerk.openSignIn();
      }
    },
  });

  return (
    <div className="flex items-center flex-none">
      <Button
        onClick={() => like.mutate({ videoId })}
        disabled={like.isPending || disLike.isPending}
        className="rounded-l-full rounded-r-none gap-2 pr-4"
        variant="secondary"
      >
        <ThumbsUpIcon
          className={cn('size-5', viewerReactions === 'like' && 'fill-black')}
        />
        {likes}
      </Button>
      <Separator orientation="vertical" className="h-7" />
      <Button
        onClick={() => disLike.mutate({ videoId })}
        disabled={like.isPending || disLike.isPending}
        className="rounded-l-none rounded-r-full gap-2 pl-3"
        variant="secondary"
      >
        <ThumbsUpIcon
          className={cn(
            'size-5',
            viewerReactions === 'disLike' && 'fill-black'
          )}
        />
        {disLikes}
      </Button>
    </div>
  );
};
