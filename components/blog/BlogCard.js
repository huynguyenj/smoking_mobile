import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import BlogCardMenu from "./BlogCardMenu";

export default function BlogCard({
  blog,
  onPress,
  onDelete,
  onUpdate,
  showMyBlogs,
}) {
  return (
    <View style={styles.card}>
      {blog.image_url?.length > 0 && (
        <TouchableOpacity
          onPress={() => onPress(blog)}
          style={styles.imageWrapper}
        >
          <Image source={{ uri: blog.image_url[0] }} style={styles.image} />
          {blog.image_url.length > 1 && (
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>
                {blog.image_url.length - 1} more
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}

      <View style={styles.titleRow}>
        <Text style={styles.title}>{blog.title}</Text>

        {showMyBlogs && (
          <BlogCardMenu
            onUpdate={() => onUpdate(blog)}
            onDelete={() => onDelete(blog)}
            showMyBlogs={showMyBlogs}
          />
        )}
      </View>

      <Text style={styles.content} numberOfLines={2}>
        {blog.content}
      </Text>
      <Text style={styles.date}>
        {new Date(blog.create_date).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  imageWrapper: {
    position: "relative",
  },
  overlay: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  overlayText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  content: {
    fontSize: 14,
    color: "#555",
  },
  date: {
    marginTop: 6,
    fontSize: 12,
    color: "#999",
  },
});
