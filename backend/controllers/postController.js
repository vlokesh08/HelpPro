
const Post = require( "../models/postsModel" );
const PersonalInfo = require( "../models/personalInfoModel" );
const addnewpost = (async (req,res)=>{
    const {username,title,body,techstack,bounty,date,pics,links} = req.body.data;
    // console.log(techstack)
    try{
        const _id = req.user._id;
    const newPost = new Post({
        author : _id,
        title : title,
        body : body,
        links,
        techstack,
        pics,
        bounty,
        date
    });
    await newPost.save();
    const user = await PersonalInfo
    .findOne({username})
    .populate('posts')
    .exec();
    user.posts.push(newPost);
    await user.save();
    res.json(user);
    }
    catch(err){
        res.status(404).json({message : err.message});
    }

})

const getallposts = (async (req,res)=>{
    //remove password from each post
    const posts = await Post.find().populate('author','-password').exec();
    res.json(posts);
});

const getpostforprofile = (async (req,res)=>{
    const username = req.params.id;
    // find posts based on username
    const profile = await PersonalInfo.findOne({
        username,
    }).populate('posts').exec();
    const posts = profile.posts;
    
    res.json(posts);
});

const editpost = (async (req,res)=>{
    const {title,body,techstack,bounty,date,links,pics} = req.body.data;
    const id = req.params.id;
    try{
        const post = await Post.findByIdAndUpdate({_id:id},{
            $set : {
                title,
                body,
                techstack,
                bounty,
                pics,
                date,
                links,
            }
        });
    }
    catch(err){
        res.status(404).json({message : err.message});
    }
    
});

const deletepost = (async (req,res)=>{
    const id = req.params.id;
    try{
        const post = await Post.findByIdAndDelete(id);
        res.json({message : "Post deleted successfully"});
    }
    catch(err){
        res.status(404).json({message : err.message});
    }
});


const getpostbyid = (async (req,res)=>{
    const post = await Post.findById(req.params.id).populate('author','-password').exec();
    res.json(post);
});

module.exports = {addnewpost,getallposts,getpostbyid ,getpostforprofile ,editpost, deletepost};