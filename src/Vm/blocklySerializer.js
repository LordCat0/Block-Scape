function blockId(n) {
    let result = '';
    while (n >= 0) {
        result = String.fromCharCode((n % 26) + 97) + result;
        n = Math.floor(n / 26) - 1;
    }
    return result;
}

export function SerializeWorkspace(workspace){
    const workspaceState = window.Blockly.serialization.workspaces.save(workspace)
    window.workspaceState = workspaceState
    if(Object.keys(workspaceState).length < 1) return {}
    const outputJson = {}
    const SerializeInputs = (inputs) => {
        const output = {}
        Object.entries(inputs).forEach(([inputName, inputValue]) => {
            output[inputName] = {}
            if(inputValue.shadow){
                switch(inputValue.shadow.type){
                    case 'inline_string_shadow': output[inputName].shadow = ['string', inputValue.shadow.fields.TEXT, inputValue.shadow.id];break;
                    case 'math_number': output[inputName].shadow = ['number', inputValue.shadow.fields.NUM, inputValue.shadow.id];break;
                    default: output[inputName].shadow = null
                }
                output[inputName].id = inputValue.shadow.id
            }else{
                output[inputName].shadow = null
            }
            if(inputValue.block){
                output[inputName].block = SerializeBlock(inputValue.block, null, false)
            }
        })
        return output
    }
    const SerializeBlock = (block, last, top) => {
        const id = blockId(Object.keys(outputJson).length)
        outputJson[id] = {type: block.type, id: block.id}
        if(block.inputs) outputJson[id].inputs = SerializeInputs(block.inputs, null, false)
        if(block.fields) outputJson[id].fields = block.fields
        if(block.icons?.comment) outputJson[id].comment = block.icons?.comment
        if(last) outputJson[id].previous = last
        if(block.next) outputJson[id].next = SerializeBlock(block.next.block, id, false)
        if(top){
            outputJson[id].position = [block.x, block.y]
            outputJson[id].top = true
        }
        return id
    }
    console.log(outputJson)
    console.log(workspaceState)
    workspaceState.blocks.blocks.forEach(block => SerializeBlock(block, null, true))
    return outputJson
}

export function DeserializeToWorkspace(blockJson, workspace){
    const deserializedArray = []
    const DeserializeInputs = (inputs) => {
        const output = {}
        Object.entries(inputs).forEach(([inputName, inputValue]) => {
            output[inputName] = {}
            if(inputValue.block) output[inputName].block = DeserializeBlockId(inputValue.block)
            if(inputValue.shadow) switch(inputValue.shadow[0]){
                case 'number': output[inputName].shadow = {
                    fields: {NUM: inputValue.shadow[1]},
                    id: inputValue.shadow[2],
                    type: "math_number"
                };break;case 'string': output[inputName].shadow = {
                    fields: {TEXT: inputValue.shadow[1]},
                    id: inputValue.shadow[2],
                    type: "inline_string_shadow"
                };break;default:
                    console.warn(`Invalid shadow type: ${inputValue.shadow[0]}`)
            }
        })
        return output
    }
    const DeserializeBlockId = (blockId) => {
        const block = blockJson[blockId]
        const output = {type: block.type, id: block.id}
        if(block.position){output.x = block.position[0]; output.y = block.position[1]}
        if(block.next) output.next = {block: DeserializeBlockId(block.next)}
        if(block.inputs) output.inputs = DeserializeInputs(block.inputs)
        return output
    }
    Object.keys(blockJson).filter(i => blockJson[i].top === true)
        .forEach(blockId => {
            deserializedArray.push(DeserializeBlockId(blockId))
        })
    console.log(deserializedArray)
    window.Blockly.serialization.workspaces.load({blocks: {languageVersion: 0, blocks: deserializedArray}}, workspace)
}