import { FormSection } from '@/modules/videos/ui/section/form-section';

interface PageProps {
  videoId: string;
}

export const VideoView = ({ videoId }: PageProps) => {
  return (
    <div className="px-4 pt-2.5 max-w-screen-lg">
      <FormSection videoId={videoId} />
    </div>
  );
};
