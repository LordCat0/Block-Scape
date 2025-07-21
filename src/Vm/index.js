import { EventEmitter } from 'events';
import { SerializeWorkspace, DeserializeToWorkspace } from './blocklySerializer'
import JSZip from 'jszip';
import Runtime from './runtime';
import Util from './util'


class VirtualMachine extends EventEmitter{
    constructor(){
        super();
        this.runtime = new Runtime();
        this.util = new Util();
        this.objects = {};
        this.assetStore = {};
    }
    async saveWorkspace(){
        const zip = new JSZip()
        zip.file('project.json', JSON.stringify(SerializeWorkspace(window.BlocklyWorkspace)))
        zip.generateAsync({type: 'blob'})
            .then(blob => this.util.download(blob, 'My project.bs'))
        
    }
    async loadProject(arrBuffer){
        if(!(arrBuffer instanceof ArrayBuffer)) throw new Error('Project input must be array buffer');
        const zip = await (new JSZip()).loadAsync(arrBuffer);
        if(!zip.file('project.json')) throw new Error('project.json not found in project file')
        const projectJson = JSON.parse(await zip.file('project.json').async('string'))
        DeserializeToWorkspace(projectJson, BlocklyWorkspace)
        this.emit('projectLoaded')
    }
}

window.vm = new VirtualMachine()