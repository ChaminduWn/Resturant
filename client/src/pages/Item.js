import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function Item() {
  const [foodItems, setFoodItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  // Fetch all food items based on search
  const fetchFoodItems = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`/api/foods/getAllFoods?search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch food items");
      }

      const data = await response.json();
      if (data.foodItems) {
        setFoodItems(data.foodItems);
        setError(null);
      } else {
        setFoodItems([]);
        setError("No items found");
      }
    } catch (error) {
      setError(error.message);
      setFoodItems([]);
    }
  };

  // Update cart count
  const updateCartCount = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const cart = JSON.parse((await AsyncStorage.getItem(`cart_${userId}`)) || "[]");
    setCartCount(cart.length);
  };

  // Add food item to the cart
  const addToCart = async (item) => {
    const userId = await AsyncStorage.getItem("userId");
    const cartKey = `cart_${userId}`;
    const currentCartList = JSON.parse(
      (await AsyncStorage.getItem(cartKey)) || "[]"
    );

    if (!currentCartList.some((cartItem) => cartItem.id === item._id)) {
      currentCartList.push({
        id: item._id,
        quantity: 1,
        price: item.price,
        foodName: item.foodName,
        image: item.image,
      });
    } else {
      currentCartList.forEach((cartItem) => {
        if (cartItem.id === item._id) {
          cartItem.quantity += 1;
        }
      });
    }

    await AsyncStorage.setItem(cartKey, JSON.stringify(currentCartList));
    setCartCount(currentCartList.length);
    showToast("Item added to cart!");
  };

  // Handle "Buy Now" button click
  const handleBuyNow = (item) => {
    addToCart(item);
    navigation.navigate("ShoppingCart");
  };

  // Show toast notification
  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: message,
      visibilityTime: 3000,
      position: "top",
    });
  };

  useEffect(() => {
    fetchFoodItems();
    updateCartCount();
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Add Your Item</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Food..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <View style={styles.cartIconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("ShoppingCart")}>
            <MaterialIcons name="shopping-cart" size={30} color="black" />
          </TouchableOpacity>
          <View style={styles.cartCount}>
            <Text style={styles.cartCountText}>{cartCount}</Text>
          </View>
        </View>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : foodItems.length === 0 ? (
          <Text style={styles.noItemsText}>No items available</Text>
        ) : (
          <FlatList
            data={foodItems}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.cardContent}>
                  <Text style={styles.foodName}>{item.foodName}</Text>
                  <Text style={styles.price}>LKR {item.price}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => addToCart(item)}
                    >
                      <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buyButton}
                      onPress={() => handleBuyNow(item)}
                    >
                      <Text style={styles.buttonText}>Buy Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  cartIconContainer: {
    position: "relative",
  },
  cartCount: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "black",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cartCountText: {
    color: "#fff",
    fontSize: 12,
  },
  content: {
    padding: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  noItemsText: {
    color: "#666",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#555",
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  buyButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
