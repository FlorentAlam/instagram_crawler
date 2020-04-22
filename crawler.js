export default class InstaCrawler{
    constructor(params){
        try{
            if(!params) throw new Error("You have to specify at least a username");
            const {username} = params;
            if(!username) throw new Error("You have to specify a username.");
            this.fetchUserDatas(username);
        } catch (e){
            console.error(e.message);
        }
    }

    async fetchUserDatas(username){
        let res = await fetch(`https://www.instagram.com/${username}/?__a=1`);
        this.datas = await res.json(); 
        console.log(this.datas);
    }

    biography(){ return this.datas.graphql.user.biography; }
    follow(){ return this.datas.graphql.user.edge_follow.count; }
    followers(){ return this.datas.graphql.user.edge_followed_by.count; }
    profilePic(def){
        try{
            if(def && def.toLowerCase() !== "sd" && def.toLowerCase() !== "hd") throw new Error(`${def} is not an available image size, you have to either choose 'sd' or 'hd'.`)
            return def ? (def.toLowerCase() === "sd" ? this.datas.graphql.user.profile_pic_url : this.datas.graphql.user.profile_pic_url_hd) : this.datas.graphql.user.profile_pic_url_hd;
        } catch (e){
            console.error(e.message);
        }
    }
    username(){ return this.datas.graphql.user.username; }
}
