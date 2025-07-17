import {useRef, useEffect} from 'react'

import * as Blockly from 'blockly/core';
import DarkTheme from '@blockly/theme-dark'
import * as libraryBlocks from 'blockly/blocks';
import {javascriptGenerator} from 'blockly/javascript';
import * as En from 'blockly/msg/en';
import './index.css'
import {
  clientToolbox,
  clientBlockDefinitions,
  serverToolbox,
  serverBlockDefinitions,
  toolboxColors
} from './blocklyToolbox'
import Renderer  from './blocklyRenderer';

/*
BLOCK CATEGORYS

events
control
math
...finsih

*/


export default function BlocklyEditor({ readonly, context }) {
  const blocklyRef = useRef(null)
  const workspaceRef = useRef(null)

  useEffect(() => {
    Blockly.setLocale(En)
    
    const toolbox = clientToolbox()
    Blockly.common.defineBlocksWithJsonArray(clientBlockDefinitions())
    Blockly.Blocks['inline_string_shadow'] = {
      init: function() {
        this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput(""), "TEXT");
        this.setOutput(true, "String");
        this.setColour(160);
      }
    };
    Blockly.Blocks['math_boolcomparison'] = {
      init: function () {
        this.appendValueInput('A')
          .setCheck('Boolean')
          .appendField('');
        this.appendDummyInput('COMPARISON')
          .appendField(new Blockly.FieldDropdown([
            ['and', 'AND'],
            ['or', 'OR'],
            ['not', 'NOT'],
            ['nor', 'NOR'],
            ['nand', 'NAND'],
            ['xor', 'XOR'],
            ['xnor', 'XNOR']
          ], this.updateShape.bind(this)), 'COMPARISON');
        this.appendValueInput('B')
          .setCheck('Boolean')
          .appendField('');
        this.setOutput(true, 'Boolean');
        this.setColour(toolboxColors.Math);
        this.setInputsInline(true)
        this.updateShape(this.getFieldValue('COMPARISON'));
      },
      mutationToDom: function () {
        const container = document.createElement('mutation');
        container.setAttribute('comparison', this.getFieldValue('COMPARISON'));
        return container;
      },
      domToMutation: function (xmlElement) {
        this.updateShape(xmlElement.getAttribute('comparison'));
      },
      updateShape: function (op) {
        if (op === 'NOT') {
          if (this.getInput('A')) {
            this.removeInput('A');
          }
        } else {
          if (!this.getInput('A')) {
            this.appendValueInput('A')
              .setCheck('Boolean')
              .appendField('');
            this.moveInputBefore('A', 'COMPARISON');
          }
        }
      }
    };
    class ToolboxBubbleCategory extends Blockly.ToolboxCategory{
      createIconDom_(){
        const element = document.createElement('div')
        element.classList.add('categoryBubble')
        element.id = btoa(this.name_.toLowerCase())
        element.style.backgroundColor = this.colour_
        element.style.border = 'none'
        this.iconElement_ = element
        return element
      }
      setSelected(selected){
        super.setSelected(selected)
        if(this.iconElement_) this.iconElement_.style.filter = selected?'brightness(0.85)':''
      }
    }
    Blockly.registry.register(
      Blockly.registry.Type.TOOLBOX_ITEM,
      Blockly.ToolboxCategory.registrationName,
      ToolboxBubbleCategory,
      true
    )
    Blockly.blockRendering.register('lcRenderer', Renderer)
    const workspace = Blockly.inject(blocklyRef.current, {
      readOnly: readonly,
      toolbox: toolbox,
      sounds: false,
      renderer: 'lcRenderer',
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
        disable: false
    })
    workspace.registerButtonCallback('createGameEvent', (button) => {
      alert('this would make a popup to make a game event.')
    })
    workspace.registerButtonCallback('openObjectSelectingDocs', (button) => {
      alert('This would open a guide on how to select game objects')
    })
    window.Blockly = Blockly
    window.BlocklyWorkspace = workspace
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