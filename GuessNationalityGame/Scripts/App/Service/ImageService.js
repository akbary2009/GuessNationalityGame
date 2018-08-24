import { Image } from '/Scripts/App/Model/Image.js';
import { Nationality } from '/Scripts/App/Model/Nationality.js';

export class ImageService {
    get() {
        return [
            new Image(1, 'fake 1', Nationality.Japanese),
            new Image(2, 'fake 1', Nationality.Thai),
            new Image(3, 'fake 1', Nationality.Chinese),
            new Image(4, 'fake 1', Nationality.Korean),
            new Image(5, 'fake 1', Nationality.Korean),
            new Image(6, 'fake 1', Nationality.Chinese),
            new Image(7, 'fake 1', Nationality.Thai),
            new Image(8, 'fake 1', Nationality.Chinese),
            new Image(9, 'fake 1', Nationality.Japanese),
            new Image(10, 'fake 1', Nationality.Thai),
        ];
    }
}
