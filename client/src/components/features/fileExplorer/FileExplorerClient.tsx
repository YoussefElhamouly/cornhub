import FileExplorerBase, {
  Header,
  SidePanel,
  ExplorerContentSection,
} from "./FileExplorer";

const FileExplorer = Object.assign(FileExplorerBase, {
  Header,
  SidePanel,
  ExplorerContent: ExplorerContentSection,
});

export default FileExplorer;
