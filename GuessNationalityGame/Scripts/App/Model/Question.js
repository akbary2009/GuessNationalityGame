import { Image } from './Image.js';

export class Question {
    constructor(image) {
        this.image = image;
        this.isShown = false;
        this.answer = null;
    }

    isCorrect(answer) {
        this.answer = answer;
        return this.image.nationality === this.answer;
    }
}
