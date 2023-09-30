import { storage } from '../../FireBase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export function handleSubmit(callback, e){
    console.log(e)
    const file = e.target.files[0]
    if (!file) return;
    const storageRef = ref(storage, `Imagens/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
        (error) => {
            alert(error);
        },
        () => {
            // Chamar o callback passando o URL de download como parâmetro
            callback(getDownloadURL(uploadTask.snapshot.ref));
        }
    )
}


export const handleSubmitImgFundo = (e) => {
    const file = e.target.files[0]
    if (!file) return;
    const storageRef = ref(storage, `ImgFundoDois/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
        (error) => {
            alert(error);
        },
        () => {
            return getDownloadURL(uploadTask.snapshot.ref)
        }
    )
}

export const handleSubmitImgFundoDois = (e) => {
    const file = e.target.files[0]
    if (!file) return;
    const storageRef = ref(storage, `ImgFundoDois/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
        (error) => {
            alert(error);
        },
        () => {
            return getDownloadURL(uploadTask.snapshot.ref)
        }
    )
}
