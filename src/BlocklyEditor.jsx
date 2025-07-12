
import { useRef, useEffect } from 'react'

import * as Blockly from 'blockly/core';
import 'blockly/blocks'
import {javascriptGenerator} from 'blockly/javascript';
import * as En from 'blockly/msg/en';



export default function BlocklyEditor(){
    const blocklyDivRef = useRef(null)
    useEffect(() => {
        const toolBox = {
            kind: "flyoutToolbox",
            contents: [
                {kind: 'block', type: 'controls_if' },
                {kind: 'block', type: 'controls_whileUntil'}
            ]
        }
        const blockDefinitions = []
        const DarkTheme = Blockly.Theme.defineTheme('DarkTheme', {
            base: Blockly.Themes.Classic,  // or null
            blockStyles: {
                colour_blocks: {
                colourPrimary: '#a5745b',
                colourSecondary: '#dbc7bd',
                colourTertiary: '#845d49'
                },
                // Add more block styles as needed
            },
            categoryStyles: {
                logic_category: {
                colour: '#5C81A6'
                },
                loops_category: {
                colour: '#5BA55B'
                },
                // etc...
            },
            componentStyles: {
                workspaceBackgroundColour: '#1e1e1e',
                toolboxBackgroundColour: '#252526',
                toolboxForegroundColour: '#f5f5f5',
                flyoutBackgroundColour: '#2d2d2d',
                flyoutForegroundColour: '#ccc',
                flyoutOpacity: 1,
                scrollbarColour: '#797979',
                insertionMarkerColour: '#fff',
                insertionMarkerOpacity: 0.3,
                markerColour: '#fff',
                cursorColour: '#d0d0d0',
                selectedGlowColour: '#4c9aff',
                selectedGlowOpacity: 0.6,
                replacementGlowColour: '#ff0000',
                replacementGlowOpacity: 0.3
            },
            fontStyle: {
                family: 'Arial',
                weight: 'normal',
                size: 12
            },
            startHats: null
            });
        Blockly.setLocale(En)
        Blockly.inject(blocklyDivRef.current, {
            toolbox: toolBox,
            theme: DarkTheme,
            zoom: {
            controls: true,
            wheel: true,
            startScale: 0.9,
            maxScale: 1.5,
            minScale: 0.3,
            scaleSpeed: 1.2
        },
        grid: {
            spacing: 20,
            length: 3,
            colour: 'rgba(255, 255, 255, 0.25)',
            snap: false
        },
        trashcan: true,
        sounds: false
        })
        //Blockly.common.defineBlocks(blockDefinitions)
    }, [])
    return (
        <div
        ref={blocklyDivRef}
        className='blocklyDiv'
        style={{height: '600px', width: '100%'}}
        ></div>
    )
}
