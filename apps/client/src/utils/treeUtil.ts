import TreeNode from 'primereact/treenode';

export namespace TreeUtil {
  export function searchTreeNodeAndChange(originTreeNode: TreeNode, path: string, getNodeProp: (node: TreeNode) => TreeNode): TreeNode {
    if (path === '/') {
      return getNodeProp(originTreeNode);
    }

    const treeNode = { ...originTreeNode };

    const stack: TreeNode[] = [treeNode];

    while (stack.length > 0) {
      let node = stack.pop();
      if (!node) break;

      const nodePath = node.key as string;

      if (path === nodePath) {
        const newNode = getNodeProp(node);
        Object.keys(newNode).forEach((key) => {
          if (!node) return;
          const prop = key as keyof TreeNode;
          node[prop] = newNode[prop];
        });
        break;
      }

      if (path.includes(nodePath)) {
        if (node?.children) {
          stack.push(...node.children);
        }
      }
    }

    return treeNode;
  }
}
