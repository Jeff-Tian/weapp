export default function divviewer() {
    return {
        visitor: {
            Identifier(path) {
                path.node.name = "LOL";
            },
        },
    };
}