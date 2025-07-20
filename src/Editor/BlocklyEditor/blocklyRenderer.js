//Renderer by @jwklong
//https://discord.com/users/567307285324496897

import * as Blockly from "blockly/core"
const svgPaths = Blockly.utils.svgPaths


class CustomConstantProvider extends Blockly.zelos.ConstantProvider {
    constructor() {
        super()

        this.NOTCH_WIDTH = 6 * this.GRID_UNIT
        this.NOTCH_HEIGHT = 1.5 * this.GRID_UNIT
    }

    init() {
        super.init()

        //this.ADD_START_HATS = true
        
        this.PLUS = this.makePlus()
    }

    makePlus() {
        const radius = this.CORNER_RADIUS

        function makeMainPath(
            blockHeight, up, right) {
            return (
                svgPaths.arc(
                    'a', '0 0,1', radius,
                    svgPaths.point(
                        (up ? -1 : 1) * radius, (up ? -1 : 1) * radius)
                    ) +
                svgPaths.arc(
                    'a', '0 0,0', radius,
                    svgPaths.point(
                        (up ? -1 : 1) * radius, (up ? -1 : 1) * radius)
                    ) +
                svgPaths.lineOnAxis('h', (right ? 1 : -1) * radius / 2) +
                svgPaths.arc(
                    'a', '0 0,1', radius,
                    svgPaths.point(
                        (up ? -1 : 1) * radius, (up ? -1 : 1) * radius)
                    ) +
                svgPaths.lineOnAxis('v', (right ? 1 : -1) * (blockHeight - radius * 6)) +
                svgPaths.arc(
                    'a', '0 0,1', radius,
                    svgPaths.point(
                        (up ? 1 : -1) * radius, (up ? -1 : 1) * radius)
                    ) +
                svgPaths.lineOnAxis('h', (right ? -1 : 1) * radius / 2) +
                svgPaths.arc(
                    'a', '0 0,0', radius,
                    svgPaths.point(
                        (up ? 1 : -1) * radius, (up ? -1 : 1) * radius)
                    ) +
                svgPaths.arc(
                    'a', '0 0,1', radius,
                    svgPaths.point(
                        (up ? 1 : -1) * radius, (up ? -1 : 1) * radius)
                    )
            )
        }

        return {
            type: this.SHAPES.HEXAGONAL,
            isDynamic: true,
            width(height) {
                const halfHeight = height / 2;
                const maxWidth = radius * 4;
                return halfHeight > maxWidth ? maxWidth : halfHeight;
            },
            height(height) {
                return height;
            },
            connectionOffsetY(connectionHeight) {
                return connectionHeight / 2;
            },
            connectionOffsetX(connectionWidth) {
                return -connectionWidth;
            },
            pathDown(height) {
                return makeMainPath(height, false, false);
            },
            pathUp(height) {
                return makeMainPath(height, true, false);
            },
            pathRightDown(height) {
                return makeMainPath(height, false, true);
            },
            pathRightUp(height) {
                return makeMainPath(height, false, true);
            },
        };
    }

    shapeFor(connection) {
        let checks = connection.getCheck();
        if (!checks && connection.targetConnection) {
            checks = connection.targetConnection.getCheck();
        }
        if (connection.type == Blockly.ConnectionType.INPUT_VALUE || connection.type == Blockly.ConnectionType.OUTPUT_VALUE) {
            if (checks && checks.length > 1) {
                return this.ROUNDED;
            } else if (checks && checks.includes('Json')) {
                return this.PLUS;
            } else if (checks && checks.includes('Object')) {
                return this.SQUARED;
            }
        }
        return super.shapeFor(connection)
    }
}

class PathObject extends Blockly.zelos.PathObject {
    updateShadow_() {}
}

class Renderer extends Blockly.zelos.Renderer {
    constructor(name) {
        super(name);
    }

    makeConstants_() {
        return new CustomConstantProvider();
    }

    makePathObject(root, style) {
        return new PathObject(root, style, this.getConstants())
    }
}

export default Renderer 