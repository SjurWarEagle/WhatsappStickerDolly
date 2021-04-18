export interface ISticker {
    image_file: string;
    emojis: string[];
}

export interface IStickerPack {
    identifier: string;
    name: string;
    publisher: string;
    tray_image_file: string;
    image_data_version: string;
    avoid_cache: string;
    publisher_email: string;
    publisher_website: string;
    privacy_policy_website: string;
    license_agreement_website: string;
    stickers: ISticker[];

}

export interface IContentJson {
    android_play_store_link: string;
    ios_app_store_link: string;
    sticker_packs: IStickerPack[]

}
