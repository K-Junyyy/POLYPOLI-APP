package com.polypoli.service;

import com.amazonaws.util.StringUtils;
import com.polypoli.entity.User;
import com.polypoli.model.dto.UserDto;
import com.polypoli.repository.UserRepository;
import com.polypoli.request.UserFollowingsUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDto toUserDto(User entity) {
        return UserDto.builder()
                .userKey(entity.getUserKey())
                .userId(entity.getUserId())
                .userPassword(entity.getUserPassword())
                .userPhoneNumber(entity.getUserPhoneNumber())
                .userArea(entity.getUserArea())
                .userRegion(entity.getUserRegion())
                .regionCongressmanId(entity.getRegionCongressmanId())
                .userStamp(entity.getUserStamp())
                .userName(entity.getUserName())
                .userGender(entity.getUserGender())
                .userYearOfBirth(entity.getUserYearOfBirth())
                .userImg(entity.getUserImg())
                .userFollowings(entity.getUserFollowings())
                .build();
    }

    public UserDto getUser(Long userKey) {
        // Optional은 null 처리를 쉽게해주는 클래스
        Optional<User> entity = userRepository.findById(userKey);
        // return entity.map(this::toUserDto).orElse(null);
        return entity.map((x) -> toUserDto(x)).orElse(null);
    }

    public UserDto getUserByUserId(String userId) {
        User entity = userRepository.findByUserId(userId);
        if (entity == null) {
            return null;
        } else {
            return toUserDto(entity);
        }
    }

    public UserDto getUserByPhoneNumber(String userPhoneNumber) {
        User entity = userRepository.findByUserPhoneNumber(userPhoneNumber);
        if (entity == null) {
            return null;
        } else {
            return toUserDto(entity);
        }
    }

    public UserDto getUserByUserName(String userName) {
        User entity = userRepository.findByUserName(userName);
        if (entity == null) {
            return null;
        } else {
            return toUserDto(entity);
        }
    }

    public void updateUserPassword(UserDto User) {
        User user = userRepository.findByUserId(User.getUserId());

        user.setUserPassword(User.getUserPassword());
        userRepository.save(user);
    }

    public UserDto createUser(UserDto User) {
        User entity = new User();
        entity.setUserId(User.getUserId());
        entity.setUserPassword(User.getUserPassword());
        entity.setUserPhoneNumber(User.getUserPhoneNumber());
        userRepository.save(entity);
        return toUserDto(entity);
    }

    public void deleteUser(UserDto User) {

        userRepository.deleteById(User.getUserKey());
    }

    public void setUserRegionAndProfile(UserDto User) {
        Optional<User> userOptional = userRepository.findById(User.getUserKey());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setUserArea(User.getUserArea());
            user.setUserRegion(User.getUserRegion());
            user.setRegionCongressmanId(User.getRegionCongressmanId());
            user.setUserImg(User.getUserImg());
            user.setUserName(User.getUserName());
            user.setUserYearOfBirth(User.getUserYearOfBirth());
            user.setUserGender(User.getUserGender());
            user.setUserFollowings("");
            userRepository.save(user);
        }
    }

    public void setUserRegion(UserDto User) {
        Optional<User> userOptional = userRepository.findById(User.getUserKey());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setUserArea(User.getUserArea());
            user.setUserRegion(User.getUserRegion());
            user.setRegionCongressmanId(User.getRegionCongressmanId());
            userRepository.save(user);
        }
    }

    public void setUserProfile(UserDto User) {
        Optional<User> userOptional = userRepository.findById(User.getUserKey());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setUserImg(User.getUserImg());
            user.setUserName(User.getUserName());
            user.setUserYearOfBirth(User.getUserYearOfBirth());
            user.setUserGender(User.getUserGender());
            userRepository.save(user);
        }
    }

    public List<User> getUserList() {
        return userRepository.findAll();
    }

    public boolean checkUserId(String userId) {
        User entity = userRepository.findByUserId(userId);
        if (entity == null) {
            return true;
        } else
            return false;
    }

    public List<Long> getUserFollowings(String userId) {
        User user = userRepository.findByUserId(userId);
        if (Objects.isNull(user)) {
            return null;
        } else {
            return followingsToList(user.getUserFollowings());
        }
    }

    public void updateUserStamp(UserDto User) {
        Optional<User> userOptional = userRepository.findById(User.getUserKey());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setUserStamp(User.getUserStamp());
            userRepository.save(user);
        }
    }

    public void updateUserFollowings(UserFollowingsUpdateRequest request) {
        Optional<User> userOptional = userRepository.findById(request.getUserKey());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Long> followings = followingsToList(user.getUserFollowings());
            if (followings.contains(request.getFollowing())) {
                followings.remove(request.getFollowing());
            } else {
                followings.add(request.getFollowing());
            }
            String updatedFollowings = followings.stream()
                    .map(String::valueOf)
                    .collect(Collectors.joining(","));
            user.setUserFollowings(updatedFollowings);
            userRepository.save(user);
        }
    }

    public void updateUserPhoneNumber(UserDto User) {
        Optional<User> userOptional = userRepository.findById(User.getUserKey());

        if (userOptional.isPresent()) {
            User entity = userOptional.get();
            entity.setUserPhoneNumber(User.getUserPhoneNumber());
            userRepository.save(entity);
        }

    }

    public UserDto login(String userId, String userPassword) {
        User user = userRepository.findByUserId(userId);

        if (user != null && (user.getUserPassword()).equals(userPassword)) {
            return toUserDto(user);
        } else {
            return null;
        }
    }

    private List<Long> followingsToList(String followings) {
        if (StringUtils.isNullOrEmpty(followings))
            return new ArrayList<>();
        return Arrays.stream(followings.split(","))
                .map(String::trim)
                .map(Long::parseLong)
                .collect(Collectors.toList());
    }
}
