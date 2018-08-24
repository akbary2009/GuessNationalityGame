export class ScoreManager {
    constructor() {
        const correntPoints = 20;
        const wrongPoints = 5;

        var _score = 0;

        this.correctAnswer = () => _score += correntPoints;
        this.wrongAnswer = () => {
            var newScore = _score - wrongPoints;
            _score = Math.max(0, newScore);
        };
        this.getScore = () => _score;
    }
}