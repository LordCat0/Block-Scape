import {useRef, useEffect} from 'react'

import * as Blockly from 'blockly/core';
import DarkTheme from '@blockly/theme-dark'
import * as libraryBlocks from 'blockly/blocks';
import {javascriptGenerator} from 'blockly/javascript';
import * as En from 'blockly/msg/en';

/*
BLOCK CATEGORYS


*/


export default function BlocklyEditor({ readonly }) {
  const blocklyRef = useRef(null)
  const workspaceRef = useRef(null)

  useEffect(() => {
    Blockly.setLocale(En)
    const toolbox = {
      kind: "flyoutToolbox",
      contents: [{
        kind: "block",
        type: "controls_if"
      }]
    }
    const workspace = Blockly.inject(blocklyRef.current, {
      readOnly: readonly,
      toolbox: toolbox,
      sounds: false,
      renderer: 'zelos',
      grid: {
        spacing: 40,
        length: 3,
        colour: 'rgba(255, 255, 255, 0.10)',
        snap: false,
        trashcan: true
      },
      move: {
        scrollbars: {horizontal: true, vertical: true},
        drag: true,
        wheel: true
      },
      theme: DarkTheme,
      comments: true
    })
  })
  return (
    <div
    className='blocklyDiv'
    ref={blocklyRef}
    style={{width:'100vh',height:'100vh'}}
    ></div>
  );
}