import ArchiveShow, { ArchiveShowType } from '@/components/ArchiveShow';

function ArchiveWidget() {
  return (
    <div>
      <ArchiveShow title="" type={ArchiveShowType.All} />
    </div>
  );
}

export default ArchiveWidget;
