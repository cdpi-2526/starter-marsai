import User from "./User.js";
import Video from "./Video.js";
import Config from "./Config.js";

// Associations
User.hasMany(Video, { foreignKey: "userId", as: "videos" });
Video.belongsTo(User, { foreignKey: "userId", as: "user" });

export default { User, Video, Config };
