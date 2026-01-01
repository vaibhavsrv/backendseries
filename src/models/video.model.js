import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new mongoose.Schema(
    {
        videoFile:{
            type: String, // cloudnary url
            required: true,
        },
        thumbnail:{
            type: String, // cloudnary url
            required: true,
        },
        title:{
            type: String, // cloudnary url
            required: true,
            index : true, // helps in search by the title
        },
        description:{
            type: String,
            required: true,
        },
        duration:{
            type: Number, // in seconds
            required: true,
        },
        views:{
            type: Number,
            default: 0,
        },
        isPublised:{
            type: Boolean,
            default: true,
        },
        creater:{
            types: Schema.Types.ObjectId,
            ref :'User',

        }
    },
    {
        timestamps: true,
    }
)

videoSchema.plugin(mongooseAggregatePaginate);  

export const Video = mongoose.model('Video',videoSchema);