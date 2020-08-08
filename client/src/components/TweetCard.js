import React from "react";
import heartEmpty from "../assets/icons/heart-empty.svg";
import heartFilled from "../assets/icons/heart-filled.svg";
import retweet from "../assets/icons/retweet.svg";
import retweeted from "../assets/icons/retweeted.svg";
import share from "../assets/icons/upload.svg";
import SmallButtons from "../components/SmallButtons";

const TweetCard = ({profilePic, name, userName, durationOfTweet, tweetText}) => {
    return (
        <div
            style={{ gridTemplateColumns: "1fr 8fr" }}
            className="grid w-full border-b-1 border-white border-opacity-25"
        >
            <div className="px-2 mt-4">
                <img
                    src={profilePic}
                    alt=""
                    className=""
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "50%",
                    }}
                />
            </div>
            <div className="flex flex-col min-h-32">
                <div className="flex-grow mt-1">
                    {name}
                    <span className="text-main-offWhite ml-3">
                        @{userName} - {durationOfTweet}
                    </span>
                </div>
                <div style={{ flexGrow: "8" }} className="flex flex-col">
                    <div style={{ flexGrow: "4" }} className="ml-2 tweet-text">
                        {tweetText}
                    </div>
                    <div className="flex-grow flex items-center justify-around">
                        <SmallButtons iconSrc={retweet} number={5} />
                        <SmallButtons iconSrc={heartEmpty} number={5} />
                        <SmallButtons iconSrc={share} number={5} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TweetCard;
