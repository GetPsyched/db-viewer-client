import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

interface RenderTree {
  name: string;
  children?: readonly RenderTree[];
}

const DatabaseTreeView = (props: any) => {
  const { dbTree } = props;

  const renderTree = (nodes: RenderTree, key: number) => (
    <TreeItem key={key} nodeId={key.toString()} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node, ++key))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {dbTree !== null ? renderTree(dbTree[0], 0) : null}
    </TreeView>
  );
};

export default DatabaseTreeView;
