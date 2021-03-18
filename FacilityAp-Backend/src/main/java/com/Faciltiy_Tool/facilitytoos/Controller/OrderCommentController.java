package com.Faciltiy_Tool.facilitytoos.Controller;

import com.Faciltiy_Tool.facilitytoos.Repository.OrderCommentRepository;
import com.Faciltiy_Tool.facilitytoos.model.OrderComment;
import com.Faciltiy_Tool.facilitytoos.model.OrderCommentData;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class OrderCommentController {

    private OrderCommentRepository repository;

    public OrderCommentController(OrderCommentRepository repository) {
        this.repository = repository;
    }


    @PostMapping("/orderComment/{orderId}")
    public OrderComment addComment(@PathVariable String orderId, @RequestBody OrderComment comment){
        OrderComment comment1 = repository.findOrderCommentByOrderId(orderId);
        if(comment1 == null){

            return repository.save(comment);
        } else {
            List<OrderCommentData> orderCommentData = comment1.getOrderCommentData();
            List<OrderCommentData> orderCommentFromclient = comment.getOrderCommentData();
            orderCommentData.add(orderCommentFromclient.get(orderCommentFromclient.size() - 1));
            return repository.save(comment1);
        }

    }



    @GetMapping("/orderComment/{orderId}")
    public OrderComment comment(@PathVariable("orderId") String orderId){
        return repository.findOrderCommentByOrderId(orderId);

    }



    @PatchMapping("/orderComment/{orderId}/{index}")
    public OrderComment updateComment(@PathVariable String orderId, @PathVariable  int index , String text){
        OrderComment comment1 = repository.findOrderCommentByOrderId(orderId);

        List<OrderCommentData> orderCommentData = comment1.getOrderCommentData();

        OrderCommentData data = orderCommentData.get(index);
        data.setText(text);
        repository.save(comment1);
        return comment1;

    }


    @DeleteMapping("/orderComment/{orderId}/{index}")
    public OrderComment deleteComment(@PathVariable String orderId, @PathVariable  int index ){
        OrderComment comment1 = repository.findOrderCommentByOrderId(orderId);

        List<OrderCommentData> orderCommentData = comment1.getOrderCommentData();
        orderCommentData.remove(index);

        return repository.save(comment1);


    }
}
