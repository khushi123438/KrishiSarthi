package com.krishisarthi.security;

import com.krishisarthi.entity.User;
import com.krishisarthi.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String usernameOrEmailOrMobile) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(usernameOrEmailOrMobile)
                .or(() -> userRepository.findByMobile(usernameOrEmailOrMobile))
                .orElseThrow(() -> new UsernameNotFoundException("User not found with identifier: " + usernameOrEmailOrMobile));

        return UserPrincipal.create(user);
    }

    @Transactional(readOnly = true)
    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));

        return UserPrincipal.create(user);
    }
}
