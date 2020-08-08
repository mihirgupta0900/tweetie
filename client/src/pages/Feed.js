import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import TweetCard from "../components/TweetCard";
import TwitterLogo from "../assets/icons/twitter.svg";
import NavItem from "../components/NavItem";

const Feed = () => {
    return (
        <div
            style={{ gridTemplateColumns: "2fr 3fr 2fr" }}
            className="grid min-h-screen bg-main-darkBlue text-white"
        >
            {/* LEFT PANE */}
            <div className="border-r-1 border-opacity-25 border-white">
                <div className="h-full ml-48 flex flex-col justify-start">
                    <div className="h-10 pt-2 flex items-center">
                        <img
                            src={TwitterLogo}
                            alt="twitter logo"
                            className="h-full"
                        />
                    </div>
                    <div className="flex flex-col mb-10 space-between">
                        <NavItem to="/feed">Home</NavItem>
                        <NavItem>Bookmarks</NavItem>
                        <NavItem>Profile</NavItem>
                    </div>
                    <Button className="mr-10 py-3">
                        <Link to="#">Tweet</Link>
                    </Button>
                </div>
            </div>
            <div className="">
                <div className="flex items-center border-b-1 border-white border-opacity-25 h-13">
                    Home
                </div>
                <div
                    style={{ gridTemplateColumns: "1fr 8fr" }}
                    className="grid w-full"
                >
                    <div className="px-2 mt-4">
                        <img
                            src="https://via.placeholder.com/150"
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
                        <div className="flex-grow">
                            <TextareaAutosize
                                className="bg-transparent text-lg focus:outline-none px-4 pt-2 w-full"
                                placeholder="What's happening?"
                            />
                        </div>
                        <div className="flex-grow flex items-center justify-end">
                            <Button className="mr-2">
                                <Link className="w-full">Tweet</Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        height: "10px",
                        backgroundColor: "rgb(37, 51, 65)",
                    }}
                ></div>
                {/* CARD */}
                <TweetCard
                    name="Paul Graham"
                    userName="paulg"
                    durationOfTweet="1day"
                    tweetText="Blah Blah"
                    profilePic="https://via.placeholder.com/150"
                />
                <TweetCard
                    name="Paul Graham"
                    userName="paulg"
                    durationOfTweet="1day"
                    tweetText="Blah Blah"
                    profilePic="https://via.placeholder.com/150"
                />
            </div>
            <div className="border-l-1 border-opacity-25 border-white">
                hello
            </div>
        </div>
    );
};

export default Feed;
