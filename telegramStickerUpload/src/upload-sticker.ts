import {StickerData} from "telegraf/typings/telegram-types";
import {IContentJson, ISticker, IStickerPack} from "./i-content-json";

const {Telegraf} = require('telegraf')

const token = '1198845591:AAE1upadrGMGeKOajf20_BcOlp7eHI14KL4';
const botUserName = 'WarEagleStickerCreatorBot'; //https://t.me/userinfobot
const stickerPackOwner = '1170615219'; //https://t.me/userinfobot
const statusReceiver = stickerPackOwner;
const projectName = 'WarEagle';
const projectPath = '/project/';//WarEagle
const contentJson: IContentJson = require(`${projectPath}/Android/app/src/main/assets/contents.json`);
const bot = new Telegraf(token)


const sendMessage = async (text: string) => {
    await bot.telegram.sendMessage(statusReceiver, text);
}

const verifyStickerSetExists = async function (technicalName: string, packName: string) {
    try {
        const result = await bot.telegram.getStickerSet(technicalName);
        console.log('getStickerPack result', result);
        // await sendMessage(`Stickerpack "${packName}" already exist, will be updated.`);
    } catch (e) {
        // await sendMessage(`Stickerpack "${packName}" does not exist, will create it.`);
        await createStickerPack(technicalName, packName);
    }
}

const addImagesToStickerSet = async function (technicalName: string, imagePath: string, sticker: ISticker) {
    console.log('uploading imagePath', imagePath);
    const uploadedImage = await bot.telegram.uploadStickerFile(stickerPackOwner, {source: imagePath})
    let emojis = '😉';
    if (sticker.emojis && sticker.emojis.length > 0) {
        emojis = sticker.emojis.join('');
    }

    const stickerData = {
        png_sticker: uploadedImage.file_id,
        emojis: emojis,
        mask__position: ''
    };
    await bot.telegram.addStickerToSet(stickerPackOwner, technicalName, stickerData, true);
}

const emptyStickerSet = async function (technicalName: string) {
    const result = await bot.telegram.getStickerSet(technicalName);
    for (const sticker of result.stickers) {
        // console.log('sticker', sticker);
        await bot.telegram.deleteStickerFromSet(sticker.file_id);
        // small waiting to avoid problems with the quota
        await sleep(100);
    }
}

const createStickerPack = async function (technicalName: string, packName: string) {
    //TODO change this path
    const uploadedImage = await bot.telegram.uploadStickerFile(stickerPackOwner, {source: "/project/imageConverter/telegram/eagle/09.png"})

    const stickerData: StickerData = {
        png_sticker: uploadedImage.file_id,
        emojis: '😉',
        mask_position: undefined
    };
    // console.log('technicalName', technicalName);
    // console.log('packName', packName);
    await bot.telegram.createNewStickerSet(stickerPackOwner, technicalName, packName, stickerData)
    //console.log('rc', rc);
    // const result = await bot.telegram.getStickerSet(technicalName);
    //console.log('createStickerPack result', result);
}

const upload = async function (packName: string, stickerPack: IStickerPack) {
    const technicalName = packName + '_by_' + botUserName;

    await sendMessage(`Starting to process sticker pack "${packName}"`);
    await verifyStickerSetExists(technicalName, packName);
    await emptyStickerSet(technicalName);

    for (const sticker of stickerPack.stickers) {
        const stickerWithoutEnding = sticker.image_file.substr(0, sticker.image_file.length - 5);
        console.log('stickerWithoutEnding', stickerWithoutEnding);
        console.log('desired filename', projectPath + `/imageConverter/telegram/${stickerPack.identifier}/${stickerWithoutEnding}.png`);
        await addImagesToStickerSet(technicalName, projectPath + `/imageConverter/telegram/${stickerPack.identifier}/${stickerWithoutEnding}.png`, sticker);
        // small waiting to avoid problems with the quota
        await sleep(500);
    }

    const result = await bot.telegram.getStickerSet(technicalName);
    // console.log('upload result', result);

    await sendMessage(`Done with sticker pack "${packName}" https://t.me/addstickers/${result.name}`);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const processStickerPacks = async function () {
    for (const stickerPack of contentJson.sticker_packs) {
        const sanitizedProject = `${projectName} ${stickerPack.name}`
            .trim()
            .split(" ").join("_")
            .replace('ß', 'ss')
            .replace('ä', 'ae')
            .replace('ü', 'ue')
            .replace('ö', 'oe')
            .replace('Ä', 'Ae')
            .replace('Ü', 'Ue')
            .replace('Ö', 'Oe')
        ;
        //todo add shortening of name if longer than 60 chars
        console.log('sanitizedProject', sanitizedProject);
        try {
            await upload(sanitizedProject, stickerPack);
        } catch (e) {
            console.error(e)
        }
    }
}


processStickerPacks();
