import {useRef, useEffect} from 'react'

import * as Blockly from 'blockly/core';
import DarkTheme from '@blockly/theme-dark'
import * as libraryBlocks from 'blockly/blocks';
import {javascriptGenerator} from 'blockly/javascript';
import * as En from 'blockly/msg/en';
import './Blockly.css'

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
    /*
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
        },{
          kind: "block",
          type: "logic_stop"
        }]
      },{
        kind: "category",
        name: "Math",
        colour: "#1ec721",
        contents: [{
          kind: "block",
          type: "logic_add"
        }]
      }]
    }
      */
    const toolboxColors = {
      Events: "#e3ab32",
      Logic: "#e3bd32",
      Math: "#1ec721"
    }
    const toolbox = `<xml id="toolbox" style="display: none">
    <category name="Events" colour="${toolboxColors.Events}">
      <block type="events_whenstarted"></block>
      <block type="events_whenstopped"></block>
      <block type="events_whenkeypressed" gap="50"></block>
      <button text="Create event" callbackKey="createGameEvent"></button>
      <block type="events_whenreceivedevent"></block>
      <block type="events_callevent"></block>
    </category>
      <category name="Logic" colour="${toolboxColors.Logic}">
      <block type="logic_wait">
        <value name="SECONDS">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>
      <block type="logic_repeat">
        <value name="REPEAT">
          <shadow type="math_number">
            <field name="NUM">5</field>
          </shadow>
        </value>
      </block>
      <block type="logic_forever"></block>
      <block type="logic_if"></block>
      <block type="logic_ifelse"></block>
      <block type="logic_waituntil"></block>
      <block type="logic_while"></block>
      <block type="logic_stop"></block>
    </category>
    <category name="Math" colour="${toolboxColors.Math}">
      <block type="math_add">
        <value name="NUM1">
          <shadow type="math_number">
            <field name="NUM">5</field>
          </shadow>
        </value>
        <value name="NUM2">
          <shadow type="math_number">
            <field name="NUM">5</field>
          </shadow>
        </value>
      </block>
      <block type="math_subtract">
        <value name="NUM1">
          <shadow type="math_number">
            <field name="NUM"></field>
          </shadow>
        </value>
        <value name="NUM2">
          <shadow type="math_number">
            <field name="NUM"></field>
          </shadow>
        </value>
      </block>
      <block type="math_multiply">
        <value name="NUM1">
          <shadow type="math_number">
            <field name="NUM"></field>
          </shadow>
        </value>
        <value name="NUM2">
          <shadow type="math_number">
            <field name="NUM"></field>
          </shadow>
        </value>
      </block>
      <block type="math_divide" gap="50">
        <value name="NUM1">
          <shadow type="math_number">
            <field name="NUM"></field>
          </shadow>
        </value>
        <value name="NUM2">
          <shadow type="math_number">
            <field name="NUM"></field>
          </shadow>
        </value>
      </block>
      <block type="math_equals">
        <value name="VALUE1">
          <shadow type="inline_string_shadow"></shadow>
        </value>
        <value name="VALUE2">
          <shadow type="inline_string_shadow"></shadow>
        </value>
      </block>
      <block type="math_notequals">
        <value name="VALUE1">
          <shadow type="inline_string_shadow"></shadow>
        </value>
        <value name="VALUE2">
          <shadow type="inline_string_shadow"></shadow>
        </value>
      </block>
      <block type="math_greaterthan">
        <value name="VALUE1">
          <shadow type="inline_string_shadow"></shadow>
        </value>
        <value name="VALUE2">
          <shadow type="inline_string_shadow"></shadow>
        </value>
      </block>
      <block type="math_lessthan">
        <value name="VALUE1">
          <shadow type="inline_string_shadow"></shadow>
        </value>
        <value name="VALUE2">
          <shadow type="inline_string_shadow"></shadow>
        </value>
      </block>
      <block type="math_greaterthanorequal">
        <value name="VALUE1">
          <shadow type="inline_string_shadow"></shadow>
        </value>
        <value name="VALUE2">
          <shadow type="inline_string_shadow"></shadow>
        </value>
      </block>
      <block type="math_lessthanorequal" gap="50">
        <value name="VALUE1">
          <shadow type="inline_string_shadow"></shadow>
        </value>
        <value name="VALUE2">
          <shadow type="inline_string_shadow"></shadow>
        </value>
      </block>
      <block type="math_and"></block>
      <block type="math_or"></block>
      <block type="math_not" gap="50"></block>
      <block type="math_randomnum">
        <value name="MIN">
          <shadow type="math_number">
            <field name="NUM"></field>
          </shadow>
        </value>
        <value name="MAX">
          <shadow type="math_number">
            <field name="NUM"></field>
          </shadow>
        </value>
      </block>
      <block type="math_letterofstring">
        <value name="LETTER">
          <shadow type="math_number">
            <field name="NUM"></field>
          </shadow>
        </value>
        <value name="STRING">
          <shadow type="inline_string_shadow"></shadow>
        </value>
      </block>
      <block type="math_joinstring">
        <value name="VALUE1">
          <shadow type="inline_string_shadow"></shadow>
        </value>
        <value name="VALUE2">
          <shadow type="inline_string_shadow"></shadow>
        </value>
      </block>
      <block type="math_stringlength" gap="50">
        <value name="STRING">
          <shadow type="inline_string_shadow"></shadow>
        </value>
      </block>
      <block type="math_mathop">
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM"></field>
          </shadow>
        </value>
      </block>
    </category>
    </xml>
`
    Blockly.common.defineBlocksWithJsonArray([{
      type: "events_whenstarted",
      message0: "When game started %1",
      args0: [{
        type: "field_image",
        src: "./assets/play.svg",
        width: 20,
        height: 20,
        alt: "*"
      }],
      hat: "cap",
      nextStatement: null,
      colour: toolboxColors.Events
    },{
      type: "events_whenstopped",
      message0: "When game stopped %1",
      args0: [{
        type: "field_image",
        src: "./assets/stop-sign.svg",
        width: 20,
        height: 20,
        alt: "*"
      }],
      hat: "cap",
      nextStatement: null,
      colour: toolboxColors.Events
    },{
      type: "events_whenkeypressed",
      message0: "When key %1 pressed %2",
      args0: [{
        type: "field_dropdown",
        name: "KEY",
        options: keys
      },{
        type: "field_image",
        src: "./assets/keyboard.svg",
        width: 20,
        height: 20,
        alt: "*"
      }],
      colour: toolboxColors.Events,
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
        src: "./assets/satellite.svg",
        width: 20,
        height: 20,
        alt: "*"
      }],
      hat: "cap",
      nextStatement: null,
      colour: toolboxColors.Events
    },{
      type: "events_callevent",
      message0: "Call event %1 %2",
      args0: [{
        type: "field_dropdown",
        name: "EVENT",
        options: [["TODO: add events", "TODO"]]
      },{
        type: "field_image",
        src: "./assets/satellite.svg",
        width: 20,
        height: 20,
        alt: "*"
      }],
      nextStatement: null,
      previousStatement: null,
      colour: toolboxColors.Events
    },{
      type: "logic_wait",
      message0: "Wait %1 seconds",
      args0: [{
        type: "input_value",
        name: "SECONDS",
        check: "Number"
      }],
      nextStatement: null,
      previousStatement: null,
      colour: toolboxColors.Logic
    },{
      type: "logic_repeat",
      message0: "Repeat %1 times\n%2",
      args0: [{
        type: "input_value",
        name: "REPEAT"
      },{
        type: "input_statement",
        name: "STATEMENT"
      }],
      previousStatement: null,
      nextStatement: null,
      colour: toolboxColors.Logic,
    },{
      type: "logic_forever",
      message0: "Forever\n%1",
      args0: [{
        type: "input_statement",
        name: "STATEMENT"
      }],
      colour: toolboxColors.Logic,
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
      colour: toolboxColors.Logic
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
      colour: toolboxColors.Logic
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
      colour: toolboxColors.Logic
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
      colour: toolboxColors.Logic
    },{
      type: "logic_stop",
      message0: "Stop %1",
      args0: [{
        type: "field_dropdown",
        name: "STOP",
        options: [
          ["Game", "GAME"],
          ["This block stack", "BLOCKSTACK"],
          ["All block stacks in script", "THISSCRIPT"],
          ["All scripts in object", "ALLSCRIPTS"]
        ]
      }],
      previousStatement: null,
      colour: toolboxColors.Logic
    },{
      type: "math_add",
      message0: "%1+%2",
      args0: [{
        type: "input_value",
        name: "NUM1",
        check: "Number"
      },{
        type: "input_value",
        name: "NUM2",
        check: "Number"
      }],
      output: "Number",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_subtract",
      message0: "%1-%2",
      args0: [{
        type: "input_value",
        name: "NUM1",
        check: "Number"
      },{
        type: "input_value",
        name: "NUM2",
        check: "Number"
      }],
      output: "Number",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_multiply",
      message0: "%1*%2",
      args0: [{
        type: "input_value",
        name: "NUM1",
        check: "Number"
      },{
        type: "input_value",
        name: "NUM2",
        check: "Number"
      }],
      output: "Number",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_divide",
      message0: "%1/%2",
      args0: [{
        type: "input_value",
        name: "NUM1",
        check: "Number"
      },{
        type: "input_value",
        name: "NUM2",
        check: "Number"
      }],
      output: "Number",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_equals",
      message0: "%1=%2",
      args0: [{
        type: "input_value",
        name: "VALUE1"
      },{
        type: "input_value",
        name: "VALUE2"
      }],
      output: "Boolean",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_notequals",
      message0: "%1≠%2",
      args0: [{
        type: "input_value",
        name: "VALUE1"
      },{
        type: "input_value",
        name: "VALUE2"
      }],
      output: "Boolean",
      colour: toolboxColors.Math,
      inputsInline: true
    },,{
      type: "math_greaterthan",
      message0: "%1>%2",
      args0: [{
        type: "input_value",
        name: "VALUE1"
      },{
        type: "input_value",
        name: "VALUE2"
      }],
      output: "Boolean",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_lessthan",
      message0: "%1<%2",
      args0: [{
        type: "input_value",
        name: "VALUE1"
      },{
        type: "input_value",
        name: "VALUE2"
      }],
      output: "Boolean",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_greaterthanorequal",
      message0: "%1≥%2",
      args0: [{
        type: "input_value",
        name: "VALUE1"
      },{
        type: "input_value",
        name: "VALUE2"
      }],
      output: "Boolean",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_lessthanorequal",
      message0: "%1≤%2",
      args0: [{
        type: "input_value",
        name: "VALUE1"
      },{
        type: "input_value",
        name: "VALUE2"
      }],
      output: "Boolean",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_and",
      message0: "%1and%2",
      args0: [{
        type: "input_value",
        name: "CONDITION1",
        check: "Boolean"
      },{
        type: "input_value",
        name: "CONDITION2",
        check: "Boolean"
      }],
      output: "Boolean",
      colour: toolboxColors.Math,
      inputsInline: true
    },,{
      type: "math_or",
      message0: "%1or%2",
      args0: [{
        type: "input_value",
        name: "CONDITION1",
        check: "Boolean"
      },{
        type: "input_value",
        name: "CONDITION2",
        check: "Boolean"
      }],
      output: "Boolean",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_not",
      message0: "not%1",
      args0: [{
        type: "input_value",
        name: "CONDITION",
        check: "Boolean"
      }],
      output: "Boolean",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_randomnum",
      message0: "Random number from %1 to %2",
      args0: [{
        type: "input_value",
        name: "MIN"
      },{
        type: "input_value",
        name: "MAX"
      }],
      output: "Number",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_joinstring",
      message0: "Join string %1%2",
      args0: [{
        type: "input_value",
        name: "VALUE1"
      },{
        type: "input_value",
        name: "VALUE2"
      }],
      output: "String",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_letterofstring",
      message0: "Letter %1 of string %2",
      args0: [{
        type: "input_value",
        name: "LETTER"
      },{
        type: "input_value",
        name: "STRING"
      }],
      output: "String",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_stringlength",
      message0: "Length of string %1",
      args0: [{
        type: "input_value",
        name: "STRING"
      }],
      output: "Number",
      colour: toolboxColors.Math,
      inputsInline: true
    },{
      type: "math_mathop",
      message0: "%1 of %2",
      args0: [{
        type: "field_dropdown",
        name: "OPERATION",
        options: [
          ["abs", "ABS"],
          ["floor", "FLOOR"],
          ["ceiling", "CEILING"],
          ["sqrt", "SQRT"],
          ["sin", "SIN"],
          ["cos", "COS"],
          ["tan", "TAN"],
          ["asin", "ASIN"],
          ["acos", "ACOS"],
          ["atan", "ATAN"],
          ["In", "IN"],
          ["log", "LOG"],
          ["e ^", "POWERE"],
          ["10 ^", "POWER10"]
        ]
      },{
        type: "input_value",
        name: "NUM"
      }],
      output: "Number",
      colour: toolboxColors.Math
    }])
    Blockly.Blocks['inline_string_shadow'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput(""), "TEXT");
    this.setOutput(true, "String");
    this.setColour(160);
  }
};
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
          startScale: 0.75,
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
    style={{
      width:'100vw',
      height:'100vh',
      display: 'absolute',
      margin: 0,
      padding: 0}}
    ></div>
  );
}