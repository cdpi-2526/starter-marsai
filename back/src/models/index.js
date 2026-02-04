import User from "./User.js";
import Video from "./Video.js";

// Associations
User.hasMany(Video, { foreignKey: "userId", as: "videos" });
Video.belongsTo(User, { foreignKey: "userId", as: "user" });

export default { User, Video };
