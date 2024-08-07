import style from "../app/page.module.css"
export default function Processing() {
    return (

        <div id={style.loading}>
            <video className={style.layer1BgVideo} autoPlay controls={false} muted loop disableRemotePlayback disablePictureInPicture playsInline>
                <source src="https://karwaan.b-cdn.net/Front/loading1.webm" type="video/webm" />
                <source src="https://karwaan.b-cdn.net/Main/Loader.mp4" type="video/mp4" />
                Your browser does not support HTML5 video.
            </video>
            <div className={style.loaderContent}>KARWAAN FILMS</div>
        </div>


    )
}