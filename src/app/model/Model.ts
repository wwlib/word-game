import { EventEmitter } from "events";
import { appVersion } from './AppVersion';
import WordGame from './WordGame';

const uuidv4 = require('uuid/v4');
const now = require("performance-now");

export default class Model extends EventEmitter {

    public statusMessages: string;
    public panelZIndexMap: Map<string, number>;
    public wordGame: WordGame;

    constructor() {
        super();
        this.panelZIndexMap = new Map<string, number>();
        this.statusMessages = '';
        this.wordGame = new WordGame();

        this.emit('ready', this);
    }

    get appVerison(): string {
        return appVersion;
    }

    updateAppStatusMessages(message: string, subsystem?: string, clearMessages: boolean = false): string {
        subsystem = subsystem || '';
        if (clearMessages) {
            this.statusMessages = '';
        }
        this.statusMessages = `${subsystem}: ${this.statusMessages}\n${message}`;
        this.onUpdate();
        return this.statusMessages;
    }

    onUpdate(): void {
        this.emit('updateModel');
    }

    dispose(): void {
    }
}
