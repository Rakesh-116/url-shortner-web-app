import React, { useState, useEffect } from "react";
import {
  Avatar,
  Text,
  Title,
  Loader,
  Center,
  Container,
  Stack,
} from "@mantine/core";
import Service from "../../utils/http";

const service = new Service();

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await service.get("user/profile");
        setUser(response.data);
        console.log("User data:", response);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (isLoading) {
    return (
      <Center mt="xl">
        <Loader size="xl" />
        <Text ml="md">Loading profile...</Text>
      </Center>
    );
  }

  if (error || !user) {
    return (
      <Center mt="xl">
        <Text color="red" size="lg">
          Failed to load user profile. Please try again later.
        </Text>
      </Center>
    );
  }

  return (
    <Container size="sm" mt="xl">
      <Stack align="center" spacing="lg">
        {console.log("Avatar source:", user.avatar)} {/* Debugging line */}
        <img
          src={user.avatar}
          alt={user.name}
          width={120}
          height={120}
          style={{ borderRadius: "50%" }}
        />
        <Title order={1} align="center" mt="md">
          {user.name}
        </Title>
        <Text align="center" color="dimmed" size="lg">
          {user.email}
        </Text>
        {/* User details */}
        <Text size="md">
          <strong>User ID:</strong> {user._id}
        </Text>
        <Text size="md">
          <strong>Account Created:</strong>{" "}
          {new Date(user.createdAt).toLocaleString()}
        </Text>
      </Stack>
    </Container>
  );
};

export default ProfilePage;

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import {
//   Avatar,
//   Text,
//   Title,
//   Loader,
//   Center,
//   Container,
//   Stack,
// } from "@mantine/core"; // Import Stack
// import Service from "../../utils/http";

// const service = new Service();

// const fetchUser = async () => {
//   const res = await service.get("user/profile");
//   return res;
// };

// const ProfilePage = () => {
//   const {
//     data: response,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["user-profile"],
//     queryFn: fetchUser,
//   });

//   console.log("Response data:", response); // Debugging line to check entire response

//   // Access the user data from the response
//   const user = response?.data;

//   const avatarSource =
//     typeof user?.avatar === "string" && user?.avatar?.trim() !== ""
//       ? user.avatar
//       : undefined;

//   if (isLoading) {
//     return (
//       <Center mt="xl">
//         <Loader size="xl" />
//         <Text ml="md">Loading profile...</Text>
//       </Center>
//     );
//   }

//   if (isError || !user) {
//     return (
//       <Center mt="xl">
//         <Text color="red" size="lg">
//           Failed to load user profile. Please try again later.
//         </Text>
//       </Center>
//     );
//   }

//   return (
//     <Container size="sm" mt="xl">
//       <Stack align="center" spacing="lg">
//         {" "}
//         {/* Use Stack for vertical alignment and spacing */}
//         <Avatar
//           src={user}
//           alt={user.name || "User Avatar"}
//           size={120}
//           radius="100%"
//         >
//           {avatarSource}
//         </Avatar>
//         {console.log("Avatar source:", user.avatar, " ", avatarSource)}{" "}
//         {/* Debugging line */}
//         {/* <img
//           src={user.avatar}
//           alt={user.name}
//           width={120}
//           height={120}
//           style={{ borderRadius: "50%" }}
//         />{" "} */}
//         <Title order={1} align="center" mt="md">
//           {user.name}
//         </Title>{" "}
//         {/* Larger title */}
//         <Text align="center" color="dimmed" size="lg">
//           {user.email}
//         </Text>{" "}
//         {/* Larger email text */}
//         {/* User details */}
//         <Text size="md">
//           <strong>User ID:</strong> {user._id}
//         </Text>
//         <Text size="md">
//           <strong>Account Created:</strong>{" "}
//           {new Date(user.createdAt).toLocaleString()}
//         </Text>
//       </Stack>
//     </Container>
//   );
// };

// export default ProfilePage;
