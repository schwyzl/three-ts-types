import { AnyJson, NodeTypeOption, NodeUpdateTypeOption } from './constants';
import NodeBuilder from './NodeBuilder';
import NodeFrame from './NodeFrame';

export default abstract class Node {
    uuid: string;
    type: string;
    isNode: true;
    nodeType: NodeTypeOption | null;
    updateType: NodeUpdateTypeOption;
    id: number;

    constructor(nodeType?: NodeTypeOption | null);

    getChildren(): Node[];
    getHash(builder: NodeBuilder): string;
    getUpdateType(builder: NodeBuilder): NodeUpdateTypeOption;
    getNodeType<TNodeTypeOption extends NodeTypeOption = NodeTypeOption>(
        builder: NodeBuilder,
        output?: string | null,
    ): TNodeTypeOption | null;
    getConstructHash(builder: NodeBuilder): string;
    getReference(builder: NodeBuilder): Node;
    construct<TNode extends Node = Node>(builder: NodeBuilder): TNode | null;
    analyze(builder: NodeBuilder): void;
    generate(builder: NodeBuilder, output?: string | null): string;
    /** This method must be overriden when {@link updateType} !== 'none' */
    update(frame: NodeFrame): void;
    build(builder: NodeBuilder, output?: string | null): string;
    serialize(json: AnyJson): void;
    deserialize(json: AnyJson): void;
    toJSON(meta?: string | { textures: {}; images: {}; nodes: {} }): AnyJson;
    getCacheKey(): string;
}
