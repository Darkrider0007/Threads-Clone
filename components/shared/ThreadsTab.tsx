import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../Cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Props{
    currentUserId: string;
    accountId: string;
    accountType: string;
}

const ThreadsTab = async({currentUserId,accountId,accountType}:
    Props)=>{

    let result: any;

    if(accountType === 'Community'){
        result = await fetchCommunityPosts(accountId);
    }else{    
         result = await fetchUserPosts(accountId);
    }

    if(!result) redirect('/');
    
    return(
        <section className="mt-9 flex flex-col
        gap-10">
            {result.threads.map((thread:any)=>(
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={currentUserId}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={thread.author}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            ))}
        </section>
    )
}
export default ThreadsTab;