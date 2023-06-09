import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { selectPosts, selectComments } from "../redux/data/selectors";

const PostsCard = ({
  postId,
  name,
  adress,
  coordinate,
  uri,
  mapClick,
  commentClick,
  setLike,
}) => {
  const posts = useSelector(selectPosts);
  const comments = useSelector(selectComments);
  const selectedPost = posts.filter((post) => post.postId === postId);
  const totalLikes = selectedPost[0].likes.length;
  const totalComments = comments.filter(
    (comment) => comment.postId === postId
  ).length;
  return (
    <View>
      <View style={styles.imageBox}>
        <Image style={styles.image} source={{ uri }} />
      </View>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.detailsBox}>
        <View style={styles.activityBox}>
          <View style={styles.activity}>
            <Text onPress={() => commentClick(postId, uri)}>
              <Feather
                name="message-circle"
                size={24}
                color={totalComments > 0 ? "#FF6C00" : "#BDBDBD"}
              />
            </Text>
            <Text>{totalComments}</Text>
          </View>
          <View style={styles.activity}>
            <TouchableOpacity
              onPress={() => setLike(postId)}
              activeOpacity={0.8}
            >
              <Feather
                name="thumbs-up"
                size={24}
                color={totalLikes > 0 ? "#FF6C00" : "#BDBDBD"}
              />
            </TouchableOpacity>
            <Text>{totalLikes}</Text>
          </View>
        </View>
        <Text style={styles.location} onPress={() => mapClick(coordinate)}>
          <Feather
            style={styles.icon}
            name="map-pin"
            size={24}
            color="#BDBDBD"
          />
          <Text>{adress}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    imageBox: {
      width: "100%",
      height: 240,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#E8E8E8",
      borderRadius: 8,
      backgroundColor: "#F6F6F6",
      // fontFamily: "Roboto-Regular",
      fontSize: 16,
      color: "#212121",
    },
    image: {
      flex: 1,
      width: "100%",
      borderRadius: 8,
      resizeMode: "cover",
    },
    detailsBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    activityBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 24,
    },
    activity: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 6,
    },
    location: {
      display: "flex",
      textAlign: "right",
      alignItems: "center",
      marginLeft: 4,
    },
    icon: {
      marginRight: 4,
    },
    title: {
      textAlign: "left",
      marginVertical: 8,
      fontWeight: 500,
      fontSize: 16,
      // fontFamily: "Roboto-Bold",
    },
  });
  

export default PostsCard;