import { Image } from './Model/Image.js';
import { Question } from './Model/Question.js';
import { Nationality } from './Model/Nationality.js';
import { ImageService } from './Service/ImageService.js';
import { ScoreManager } from './Business/ScoreManager.js';

var images = new ImageService().get();
var scoreManager = new ScoreManager();
debugger;