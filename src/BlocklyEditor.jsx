import {useRef, useEffect} from 'react'

import * as Blockly from 'blockly/core';
import DarkTheme from '@blockly/theme-dark'
import * as libraryBlocks from 'blockly/blocks';
import {javascriptGenerator} from 'blockly/javascript';
import * as En from 'blockly/msg/en';

/*
BLOCK CATEGORYS

events
control
math
...finsih

*/


export default function BlocklyEditor({ readonly, game3d }) {
  const blocklyRef = useRef(null)
  const workspaceRef = useRef(null)

  useEffect(() => {
    Blockly.setLocale(En)
    const keys = [
      ["A", "a"], ["B", "b"], ["C", "c"], ["D", "d"], ["E", "e"],
      ["F", "f"], ["G", "g"], ["H", "h"], ["I", "i"], ["J", "j"],
      ["K", "k"], ["L", "l"], ["M", "m"], ["N", "n"], ["O", "o"],
      ["P", "p"], ["Q", "q"], ["R", "r"], ["S", "s"], ["T", "t"],
      ["U", "u"], ["V", "v"], ["W", "w"], ["X", "x"], ["Y", "y"],
      ["Z", "z"],

      ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"],
      ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"],

      ["Arrow Up", "ArrowUp"], ["Arrow Down", "ArrowDown"],
      ["Arrow Left", "ArrowLeft"], ["Arrow Right", "ArrowRight"],

      ["Enter", "Enter"], ["Escape", "Escape"], ["Backspace", "Backspace"],
      ["Tab", "Tab"], ["Caps Lock", "CapsLock"], ["Shift", "Shift"],
      ["Control", "Control"], ["Alt", "Alt"], ["Meta (Cmd/Win)", "Meta"],

      ["Space", " "], ["Page Up", "PageUp"], ["Page Down", "PageDown"],
      ["End", "End"], ["Home", "Home"], ["Insert", "Insert"], ["Delete", "Delete"],

      ["F1", "F1"], ["F2", "F2"], ["F3", "F3"], ["F4", "F4"],
      ["F5", "F5"], ["F6", "F6"], ["F7", "F7"], ["F8", "F8"],
      ["F9", "F9"], ["F10", "F10"], ["F11", "F11"], ["F12", "F12"],

      [";", ";"], ["=", "="], [",", ","], ["-", "-"],
      [".", "."], ["/", "/"], ["`", "`"], ["[", "["],
      ["\\", "\\"], ["]", "]"], ["'", "'"]
    ]
    const toolbox = {
      kind: "categoryToolbox",
      contents: [{
        kind: "category",
        name: "Events",
        colour: "#e3ab32",
        contents: [{
          kind: "block",
          type: "events_whenstarted"
        },{
          kind: "block",
          type: "events_whenstopped"
        },{
          kind: "block",
          type: "events_whenkeypressed",
          gap: 50
        },{
          kind: "button",
          text: "Create event",
          callbackKey: "createGameEvent"
        },{
          kind: "block",
          type: "events_whenreceivedevent"
        },{
          kind: "block",
          type: "events_callevent"
        }]
      },{
        kind: "category",
        name: "Logic",
        colour: "#e3bd32",
        contents: [{
          kind: "block",
          type: "logic_wait"
        },{
          kind: "block",
          type: "logic_repeat"
        },{
          kind: "block",
          type: "logic_forever"
        },{
          kind: "block",
          type: "logic_if"
        },{
          kind: "block",
          type: "logic_ifelse"
        },{
          kind: "block",
          type: "logic_waituntil"
        },{
          kind: "block",
          type: "logic_while"
        }]
      }]
    }
    Blockly.common.defineBlocksWithJsonArray([{
      type: "events_whenstarted",
      message0: "When game started %1",
      args0: [{
        type: "field_image",
        src: "/assets/play.svg",
        width: 20,
        height: 20,
        alt: "*"
      }],
      hat: "cap",
      nextStatement: null,
      colour: toolbox.contents[0].colour
    },{
      type: "events_whenstopped",
      message0: "When game stopped %1",
      args0: [{
        type: "field_image",
        src: "/assets/stop-sign.svg",
        width: 20,
        height: 20,
        alt: "*"
      }],
      hat: "cap",
      nextStatement: null,
      colour: toolbox.contents[0].colour
    },{
      type: "events_whenkeypressed",
      message0: "When key %1 pressed %2",
      args0: [{
        type: "field_dropdown",
        name: "KEY",
        options: keys
      },{
        type: "field_image",
        src: "/assets/keyboard.svg",
        width: 20,
        height: 20,
        alt: "*"
      }],
      colour: toolbox.contents[0].colour,
      hat: "cap",
      nextStatement: null
    },{
      type: "events_whenreceivedevent",
      message0: "When event %1 called %2",
      args0: [{
        type: "field_dropdown",
        name: "EVENT",
        options: [["TODO: add events", "TODO"]]
      },{
        type: "field_image",
        src: "/assets/satellite.svg",
        width: 20,
        height: 20,
        alt: "*"
      }],
      hat: "cap",
      nextStatement: null,
      colour: toolbox.contents[0].colour
    },{
      type: "events_callevent",
      message0: "Call event %1 %2",
      args0: [{
        type: "field_dropdown",
        name: "EVENT",
        options: [["TODO: add events", "TODO"]]
      },{
        type: "field_image",
        src: "/assets/satellite.svg",
        width: 20,
        height: 20,
        alt: "*"
      }],
      nextStatement: null,
      previousStatement: null,
      colour: toolbox.contents[0].colour
    },{
      type: "logic_wait",
      message0: "Wait %1 seconds",
      args0: [{
        type: "field_number",
        name: "SECONDS"
      }],
      nextStatement: null,
      previousStatement: null,
      colour: toolbox.contents[1].colour
    },{
      type: "logic_repeat",
      message0: "Repeat %1 times\n%2",
      args0: [{
        type: "field_number",
        name: "REPEAT"
      },{
        type: "input_statement",
        name: "STATEMENT"
      }],
      previousStatement: null,
      nextStatement: null,
      colour: toolbox.contents[1].colour,
    },{
      type: "logic_forever",
      message0: "Forever\n%1",
      args0: [{
        type: "input_statement",
        name: "STATEMENT"
      }],
      colour: toolbox.contents[1].colour,
      previousStatement: null
    },{
      type: "logic_if",
      message0: "If %1 then %2",
      args0: [{
        type: "input_value",
        name: "CONDITION",
        check: "Boolean"
      },{
        type: "input_statement",
        name: "STATEMENT"
      }],
      nextStatement: null,
      previousStatement: null,
      colour: toolbox.contents[1].colour
    },{
      type: "logic_ifelse",
      message0: "If %1 then %2 else %3",
      args0: [{
        type: "input_value",
        name: "CONDITION",
        check: "Boolean"
      },{
        type: "input_statement",
        name: "STATEMENT1"
      },{
        type: "input_statement",
        name: "STATEMENT2"
      }],
      nextStatement: null,
      previousStatement: null,
      colour: toolbox.contents[1].colour
    },{
      type: "logic_waituntil",
      message0: "Wait until %1",
      args0: [{
        type: "input_value",
        name: "CONDITION",
        check: "Boolean"
      }],
      previousStatement: null,
      nextStatement: null,
      colour: toolbox.contents[1].colour
    },{
      type: "logic_while",
      message0: "While %1 do \n%2",
      args0: [{
        type: "input_value",
        name: "CONDITION",
        check: "Boolean"
      },{
        type: "input_statement",
        name: "STATEMENT"
      }],
      nextStatement: null,
      previousStatement: null,
      colour: toolbox.contents[1].colour
    }])
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
      },
      move: {
        scrollbars: {horizontal: true, vertical: true},
        drag: true,
        wheel: true
      },
      theme: DarkTheme,
      comments: true,
      trashcan: true,
      zoom:{
          controls: true,
          wheel: false,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true
        },
    })
    workspace.registerButtonCallback('createGameEvent', (button) => {
      alert('this would make a popup to make a game event.')
    })
  })
  return (
    <div
    className='blocklyDiv'
    ref={blocklyRef}
    style={{width:'100vw',height:'100vh', display: 'static'}}
    ></div>
  );
}