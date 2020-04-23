export default class InstaCrawler{
    constructor(){
        this.endCursor = null;
    }

    async fetchUserDatas(username){
        try{   
            if(!username) throw new Error('You have to specify a user to fetch data from.');
            this.username = username;
            let res = await fetch(`https://www.instagram.com/${this.username}/?__a=1`);
            this.datas = await res.json(); 
            if(this.datas.graphql.user.edge_owner_to_timeline_media.page_info.has_next_page){
                this.endCursor = this.datas.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor;
            }
        } catch (e){
            console.error(e.message);
        }
    }

    get biography(){ return this.subscribe(this.datas.graphql.user.biography); }
    get follow(){ return this.datas.graphql.user.edge_follow.count; }
    get followers(){ return this.datas.graphql.user.edge_followed_by.count; }
    profilePic(def){
        try{
            if(def && def.toLowerCase() !== "sd" && def.toLowerCase() !== "hd") throw new Error(`${def} is not an available image size, you have to either choose 'sd' or 'hd'.`)
            return def ? (def.toLowerCase() === "sd" ? this.datas.graphql.user.profile_pic_url : this.datas.graphql.user.profile_pic_url_hd) : this.datas.graphql.user.profile_pic_url_hd;
        } catch (e){
            console.error(e.message);
        }
    }
    get username(){ return this.datas.graphql.user.username; }
    get medias(){
        return {
            medias: this.datas.graphql.user.edge_owner_to_timeline_media.edges,
            hasMore: this.datas.graphql.user.edge_owner_to_timeline_media.page_info.has_next_page
        };
    }
    // async nextMedias(){
    //     let next = await this._fetchNextMedias()
    //         .then(medias => {
    //             this.datas.graphql.user.edge_owner_to_timeline_media.edges.push(...medias.edges);
    //             if(medias.page_info.has_next_page) this.endCursor = medias.page_info.end_cursor;
    //             return {
    //                 medias: medias.edges,
    //                 hasMore: medias.page_info.has_next_page
    //             }
    //         })
    //     return next;
    // }

    // async _fetchNextMedias(){
    //     console.log(this.endCursor);
    //     let res = await fetch(`https://www.instagram.com/${this.username}/?__a=1&after=${this.endCursor}`);
    //     let datas = await res.json();
    //     console.log(datas.graphql.user.edge_owner_to_timeline_media.edges[0].node)
    //     return datas.graphql.user.edge_owner_to_timeline_media;
    // }
}
