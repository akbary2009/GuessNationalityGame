import { Image } from '/Scripts/App/Model/Image.js';
import { Nationality } from '/Scripts/App/Model/Nationality.js';

export class ImageService {
    get() {
        var getImagePath = id => `/Images/${id}.png`;
        return [
            new Image(1, getImagePath(1), Nationality.Japanese),
            new Image(2, getImagePath(2), Nationality.Thai),
            new Image(3, getImagePath(3), Nationality.Chinese),
            new Image(4, getImagePath(4), Nationality.Korean),
            new Image(5, getImagePath(5), Nationality.Korean),
            new Image(6, getImagePath(6), Nationality.Chinese),
            new Image(7, getImagePath(7), Nationality.Thai),
            new Image(8, getImagePath(8), Nationality.Chinese),
            new Image(9, getImagePath(9), Nationality.Japanese),
            new Image(10, getImagePath(10), Nationality.Thai),
        ];
    }
}
