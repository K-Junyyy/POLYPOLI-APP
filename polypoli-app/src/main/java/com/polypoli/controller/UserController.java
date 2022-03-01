package com.polypoli.controller;

import com.polypoli.entity.User;
import com.polypoli.model.dto.UserDto;
import com.polypoli.request.UserFollowingsUpdateRequest;
import com.polypoli.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Data
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    @GetMapping("/user")
    public UserDto getUser(@RequestParam Long userKey) {
        return userService.getUser(userKey);
    }

    @GetMapping("/userByUserId")
    public UserDto getUserByUserId(@RequestParam String userId) {
        return userService.getUserByUserId(userId);
    }

    @GetMapping("/userByPhoneNumber")
    public UserDto getUserByPhoneNumber(@RequestParam String userPhoneNumber) {
        return userService.getUserByPhoneNumber(userPhoneNumber);
    }

    @GetMapping("/userByUserName")
    public UserDto getUserByUserName(@RequestParam String userName) {
        return userService.getUserByUserName(userName);
    }

    @PostMapping("/userPassword")
    public void updateUserPassword(@RequestBody UserDto User) {
        userService.updateUserPassword(User);
    }

    @PostMapping("/userPhoneNumber")
    public void updateUserPhoneNumber(@RequestBody UserDto User) {
        userService.updateUserPhoneNumber(User);
    }

    @GetMapping("/userList")
    public List<User> getUserList() {
        return userService.getUserList();
    }

    @GetMapping("/userId")
    public boolean checkUserId(@RequestParam String userId) {
        return userService.checkUserId(userId);
    }

    @PostMapping("/user")
    public UserDto createUser(@RequestBody UserDto User) {
        return userService.createUser(User);
    }

    @DeleteMapping("/user")
    public void deleteUser(@RequestBody UserDto User) {
        userService.deleteUser(User);
    }

    @PutMapping("/userRegionAndProfile")
    public void setUserRegionAndProfile(@RequestBody UserDto User) {
        userService.setUserRegionAndProfile(User);
    }

    @PutMapping("/userRegion")
    public void setUserRegion(@RequestBody UserDto User) {
        userService.setUserRegion(User);
    }

    @PutMapping("/userProfile")
    public void setUserProfile(@RequestBody UserDto User) {
        userService.setUserProfile(User);
    }

    @PatchMapping("/userStamp")
    public void updateUserStamp(@RequestBody UserDto User) {
        userService.updateUserStamp(User);
    }

    @PostMapping("/userFollowings")
    public void updateUserFollowings(@RequestBody UserFollowingsUpdateRequest request) {
        userService.updateUserFollowings(request);
    }

    @GetMapping("/login")
    public UserDto login(@RequestParam String userId, @RequestParam String userPassword) {
        return userService.login(userId, userPassword);
    }
}
