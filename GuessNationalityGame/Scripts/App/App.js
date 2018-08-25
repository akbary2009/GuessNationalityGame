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

        $('body').on('dragover', e => this.onDragover(e));
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

        this.showNext();
    }

    showNext() {
        var image = this.getNextImage();
        this.showScore();
        if (image == null) {
            // game is finished
            this.showScorePage();
        }
        else {
            this.showStatus();
            this.renderImage(image);
        }
    }

    renderImage(image) {
        var duration = 3000;
        if (!image) return;

        var imageTag = $('<img/>', {
            class: 'img img-rounded img-responsive question',
            src: image.url,
            draggable: 'true',
        })
            .data('id', image.id)
            .prependTo('.question-container');

        $('.question')
            .animate({ 'top': '60%' }, duration, e => {
                $('.question').remove();
                this.answer(image.id, null)
            })
            .on('dragstart', e => {
                var event = e.originalEvent;
                var offset_data = event.clientX + ',' + event.clientY;
                this.offset_data = offset_data;
            });
    }

    showScorePage() {
        $('.game-page').addClass('hidden');
        $('.score-page').removeClass('hidden')
    }
    showScore() {
        var finalScore = this.scoreManager.getScore();
        $('.score').text(`Score: ${finalScore}`);
    }
    showStatus() {
        var currentIndex = this.questions.filter(q => q.isShown).length;
        $('.status').text(`${currentIndex}/${this.questions.length}`);
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

    onDragover(e) {
        if (!this.offset_data) return;

        const animationDuration = 500;
        const dragOffset = 20;
        var oe = e.originalEvent;
        var offset = this.offset_data.split(',');
        var offsetX = oe.clientX - parseInt(offset[0], 10);
        var offsetY = oe.clientY - parseInt(offset[1], 10);

        if (Math.abs(offsetX) >= dragOffset || Math.abs(offsetY) >= dragOffset) {

            var image = $('.question');
            var imageId = image.data('id');

            var screenCenterX = window.screen.width / 2;
            var screenCenterY = window.screen.height / 2;
            var isOnTopPart = oe.clientY < screenCenterY;
            var isOnLeftPart = oe.clientX < screenCenterX;

            var top = 0;
            var left = 0;
            var answer = null;

            if (!isOnTopPart)
                top = window.screen.height - parseInt(image.css('height'));
            if (!isOnLeftPart)
                left = window.screen.width - parseInt(image.css('width'));

            if (isOnTopPart && isOnLeftPart)
                answer = Nationality.Japanese;
            else if (isOnTopPart && !isOnLeftPart)
                answer = Nationality.Chinese;
            else if (!isOnTopPart && isOnLeftPart)
                answer = Nationality.Korean;
            else if (!isOnTopPart && !isOnLeftPart)
                answer = Nationality.Thai;
            if (!answer) return;

            image.stop()
                .fadeOut(animationDuration, e => {
                    $('.question').remove();
                    this.answer(imageId, answer);
                })
                .animate({ 'top': top + 'px', 'left': left + 'px' }, { duration: animationDuration, queue: false });
        }
    }
};

(function () {
    var app = new App();
    app.init();
})();
