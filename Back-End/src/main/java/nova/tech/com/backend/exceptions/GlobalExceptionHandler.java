package nova.tech.com.backend.exceptions;


import static org.springframework.http.HttpStatus.*;

import nova.tech.com.backend.dtos.response.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(INTERNAL_SERVER_ERROR)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception exception) {
        return ResponseEntity.internalServerError().body(
                new ErrorResponse(INTERNAL_SERVER_ERROR, exception.getMessage())
        );
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(NOT_FOUND)
    public ResponseEntity<ErrorResponse> handleDataNotFoundException(ResourceNotFoundException e){
        return ResponseEntity.badRequest().body(
                new ErrorResponse(NOT_FOUND, e.getMessage())
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
        List<String> errorMessages = e.getBindingResult().getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .toList();
        return ResponseEntity.badRequest().body(
                new ErrorResponse(BAD_REQUEST, String.join("; ", errorMessages))
        );
    }

    @ExceptionHandler(ConflictException.class)
    @ResponseStatus(CONFLICT)
    public ResponseEntity<ErrorResponse> handleConflictException(ConflictException e){
        return ResponseEntity.badRequest().body(
                new ErrorResponse(CONFLICT, e.getMessage())
        );
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException e){
        return ResponseEntity.badRequest().body(
                new ErrorResponse(BAD_REQUEST, "File too large!")
        );
    }

    @ExceptionHandler(InvalidFileTypeException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleInvalidFileTypeException(InvalidFileTypeException e){
        return ResponseEntity.badRequest().body(
                new ErrorResponse(BAD_REQUEST, e.getMessage())
        );
    }

    @ExceptionHandler(InvalidParamException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleInvalidParamException(
            InvalidParamException e){
        return ResponseEntity.badRequest().body(
                new ErrorResponse(BAD_REQUEST, e.getMessage())
        );
    }

}
