import { NextPage, InferGetServerSidePropsType, NextPageContext } from "next";
import styles from '../styles/Home.module.css'
const YtHtmlView: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>> = ({ isSuccess, data, message }) => {
    console.log("Data -> ", data);
    
    return (
        <>
            <div style={{fontSize: "28px !important", margin: 0, padding: 0}}>
                <h2 style={isSuccess ? {color: "green"} : {color: "red"}}>{isSuccess ? "성공": "실패"}</h2>
                {!isSuccess ? (
                    <>
                        <span>
                            {message}
                        </span>
                        <p>404: playlistId가 올바르지 않음<br/>403: apikey가 잘못됨</p>
                    </>) : null}
            </div>

            {/* 리스트: 실패시에도 띄우게 하면 undefined 오류 발생함 */}
            {isSuccess ?
            <ul className={styles.grid} style={{maxHeight: "400px"}}>
                {data.items.map(({ id, snippet }: {
                    id: string,
                    snippet: {
                        title: string,
                        thumbnails: {
                            medium: {
                                url: string
                            }
                        },
                        resourceId: {
                            videoId: string
                        }
                    }
                }) => {
                    const { title, thumbnails, resourceId } = snippet;
                    const { medium } = thumbnails;
                    return (
                        <li key={id} className={styles.card} style={{listStyle: "none", height: "400px"}}>
                            <a href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}>
                                <p>
                                    <img width={"100%"} src={medium.url} alt={title} style={{display: "block"}} />
                                </p>
                                <h3>{ title }</h3>
                            </a>
                        </li>
                    )
                })}
            </ul>: null}
        </>
    )
}

export const getServerSideProps = async (context: NextPageContext) => {
    try {
        const { listId } = context.query;
        const url = new URL(process.env.apiBaseUrl || "https://www.googleapis.com/youtube/v3/playlistItems");
        url.searchParams.append("maxResults", "50");
        url.searchParams.append("playlistId", listId as string);
        url.searchParams.append("part", "snippet");
        url.searchParams.append("key", process.env.apiKey || "");
        console.log("URL->", url.href);

        const response = await fetch(url.href);
        const data = await response.json();
        console.log("Data from side -> ", data);
        if(!response.ok) return { props: { 
            isSuccess: false, data: null, message: response.status.toString()
        } }
        return {
            props: {
                isSuccess: true,
                data,
                message: ""
            },
        }
    } catch(e) {
        return {
            props: {
                isSuccess: false,
                data: null,
                message: `Request error: ${e?.toString()}`
            },
        }
    }
}


// Export component
export default YtHtmlView;