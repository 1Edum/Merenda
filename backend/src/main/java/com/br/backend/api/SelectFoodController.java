package com.br.backend.api;

import com.br.backend.model.SelectFood;
import com.br.backend.repository.SelectFoodRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/select-food")
public class SelectFoodController {

    private static final Logger log = LoggerFactory.getLogger(SelectFoodController.class);

    @Autowired
    private SelectFoodRepository selectFoodRepository;

    @GetMapping
    public List<SelectFood> listFoods() {
        return selectFoodRepository.findAll();
    }

    @PostMapping("/user-select")
    public ResponseEntity<Object> selectFood(@RequestBody SelectFood selectFood) {
        try {
            Date currentDate = new Date(System.currentTimeMillis());

            // Check for null user and foods.  Add explicit checks here.
            if (selectFood.getUser() == null) {
                log.error("User is null in request body");
                return ResponseEntity.badRequest().body("User cannot be null");
            }
            if (selectFood.getFoods() == null || selectFood.getFoods().isEmpty()) {
                log.error("Foods list is null or empty in request body");
                return ResponseEntity.badRequest().body("Foods list cannot be null or empty");
            }

            //Check for nulls in the food list itself - this is important!
            for(var food : selectFood.getFoods()){
                if(food == null){
                    log.error("Null food object in foods list");
                    return ResponseEntity.badRequest().body("Food objects cannot be null");
                }
                //Further checks on food items could go here, if needed.
            }

            // Check for existing selection
            Optional<SelectFood> existingSelection = selectFoodRepository.findByUserAndDateSelect(selectFood.getUser(), currentDate);

            if (existingSelection.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User already has a selection for this date.");
            } else {
                selectFood.setDateSelect(currentDate);
                selectFoodRepository.save(selectFood);
                return ResponseEntity.ok().build();
            }
        } catch (DataIntegrityViolationException e) {
            log.error("Database constraint violation:", e);
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Database constraint violated. Check your data.");
        } catch (EmptyResultDataAccessException e) {
            log.error("No result found:", e);
            return ResponseEntity.notFound().build();
        } catch (EntityNotFoundException e) {
            log.error("Entity not found:", e);
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            log.error("Illegal argument:", e);
            return ResponseEntity.badRequest().body("Illegal argument. Review your request data.");
        } catch (NoSuchElementException e) {
            log.error("No such element:", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("A required element was not found.");
        } catch (Exception e) {
            log.error("An unexpected error occurred:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }
}