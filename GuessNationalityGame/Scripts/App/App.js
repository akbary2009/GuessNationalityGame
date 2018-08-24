import { Image } from './Model/Image.js';
import { Question } from './Model/Question.js';
import { Nationality } from './Model/Nationality.js';
import { ImageService } from './Service/ImageService.js';
import { ScoreManager } from './Business/ScoreManager.js';


class App {
    constructor() {
        this.scoreManager = new ScoreManager();
        this.imageService = new ImageService();
    }

    init() {
        var images = this.imageService.get();
        this.shuffleArray(images);
        this.questions = images.map(image => new Question(image));

        this.showNext();
    }

    answer(id, nationality) {
        var question = this.questions.filter(q => q.image.id == id)[0];
        if (!question || !question.isShown || question.answer) return;

        var answer = Nationality[nationality];
        if (question.isCorrect(answer))
            this.scoreManager.correctAnswer();
        else
            this.scoreManager.wrongAnswer();

        this.showNext(); //?
    }

    showNext() {
        var image = this.getNextImage();
        this.showScore();
        if (image == null) {
            // game is finished
            this.showScorePage();
        }
        else {
            this.renderImage(image);
        }
    }

    renderImage(image) {
        var duration = 3000;
        if (!image) return;

        var imageTag = $('<img/>', {
            class: 'img img-rounded img-responsive question',
            src: image.url,
        })
            .data('id', image.id)
            .prependTo('.question-container');
        $('.question')
            .fadeOut(duration, e => {
                $('.question').remove();
                this.answer(image.id, null)
            })
            .animate({ 'top': '60%' }, { duration: duration, queue: false });
    }

    showScorePage() {
        $('.game-page').addClass('hidden');
        $('.score-page').removeClass('hidden')
    }
    showScore() {
        var finalScore = this.scoreManager.getScore();
        $('.score').text(`Score: ${finalScore}`);
    }

    getNextImage() {
        var firstUnshownQuestion = this.questions.filter(q => !q.isShown)[0];
        if (firstUnshownQuestion) {
            firstUnshownQuestion.isShown = true;
        }
        return firstUnshownQuestion
            ? firstUnshownQuestion.image
            : null;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {            const j = Math.floor(Math.random() * (i + 1));            [array[i], array[j]] = [array[j], array[i]];        }
    }
};

(function () {
    var app = new App();
    app.init();
})();
