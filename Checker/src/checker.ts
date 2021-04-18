import {existsSync, readdirSync} from "fs";
import {IContentJson} from "./i-content-json";

// const assetsPath = 'C:\\IdeaProjects\\whatsappstickerexperiment\\Android\\app\\src\\main\\assets';
const assetsPath = '/project/Android/app/src/main/assets';

const contentJson: IContentJson = require(`${assetsPath}/contents.json`);

class Checker {
    public reportError(message: string) {
        console.error(message);
    }

    public checkMaxImages(contentJson: IContentJson) {
        contentJson.sticker_packs.forEach((stickerPack) => {
            if (stickerPack.stickers.length > 30) {
                this.reportError(`Sticker pack "${stickerPack.identifier}" contains too many images (${stickerPack.stickers.length}) maximal 30 are allowed.`);
            } else if (stickerPack.stickers.length === 0) {
                this.reportError(`Sticker pack "${stickerPack.identifier}" does not contain any images.`);
            }

        })
    }

    public checkImagesAreWebp(contentJson: IContentJson) {
        contentJson.sticker_packs.forEach((stickerPack) => {
            stickerPack.stickers.forEach((sticker) => {
                if (!sticker.image_file.toLocaleLowerCase().endsWith('.webp')) {
                    this.reportError(`Sticker pack "${stickerPack.identifier}" contains image "${sticker.image_file}" which is no webp.`);
                }
            })
        })
    }

    public checkImagesExists(contentJson: IContentJson) {
        contentJson.sticker_packs.forEach((stickerPack) => {
            stickerPack.stickers.forEach((sticker) => {
                if (!existsSync(`${assetsPath}/${stickerPack.identifier}/${sticker.image_file}`)) {
                    this.reportError(`Sticker pack "${stickerPack.identifier}" contains image "${sticker.image_file}" which does not exist.`);
                }
            })
        })
    }

    public checkUnhandledImages(contentJson: IContentJson) {
        contentJson.sticker_packs.forEach((stickerPack) => {
            const directoryContent = readdirSync(`${assetsPath}/${stickerPack.identifier}`);
            // console.log('directoryContent', directoryContent);
            directoryContent.forEach((file) => {
                if (!file.toLocaleLowerCase().endsWith('.webp')) {
                    return;
                }
                const found = stickerPack.stickers.filter((value) => value.image_file == file).length > 0;
                if (!found) {
                    this.reportError(`Sticker pack "${stickerPack.identifier}" is missing image "${file}."`);
                }
            })
        })
    }

    public checkTrayIconExists(contentJson: IContentJson) {
        contentJson.sticker_packs.forEach((stickerPack) => {
            if (stickerPack.tray_image_file && !existsSync(`${assetsPath}/${stickerPack.identifier}/${stickerPack.tray_image_file}`)) {
                this.reportError(`Sticker pack "${stickerPack.identifier}" shall use tray icon "${stickerPack.tray_image_file} which does not exist."`);
            }
        })
    }
}

// console.log('content.json to check:', contentJson);
const checker = new Checker();
checker.checkMaxImages(contentJson);
checker.checkImagesAreWebp(contentJson);
checker.checkImagesExists(contentJson);
checker.checkTrayIconExists(contentJson);
checker.checkUnhandledImages(contentJson);
