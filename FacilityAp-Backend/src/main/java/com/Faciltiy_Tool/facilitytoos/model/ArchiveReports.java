
package com.Faciltiy_Tool.facilitytoos.model;

        import org.springframework.data.annotation.Id;
        import org.springframework.data.mongodb.core.mapping.Document;

        import java.time.LocalDate;
        import java.util.ArrayList;
        import java.util.LinkedHashSet;
        import java.util.List;
        import java.util.Set;

@Document(collection = "ArchiveReports")
public class ArchiveReports {
    @Id
    private String id;
    private String reporterId;
    private String reporterName;
    private String title;
    private String description;

    private String location; // e.g. 2.05
    private boolean closeTo;
    private String campus;
    private String floor;
    private String status;
    private List<String> statusHistory;

    private String priority;
    private String categoryDepartment;
    private String category;
    private byte[] bytes;
    private User assignTo;
    private LocalDate createdOn;
    private int upVote;
    private Set<String> subscribers;

    public ArchiveReports() {
    }

    public ArchiveReports( String reporterId, String reporterName, String title, String description, String location, boolean closeTo, String campus,String floor, String status, String priority, String categoryDepartment, String category,  byte[] bytes, User assignTo) {
        this.reporterId = reporterId;
        this.reporterName = reporterName;
        this.title = title;
        this.description = description;
        this.location = location;
        this.closeTo = closeTo;
        this.campus = campus;
        this.floor = floor;
        this.status = status;
        this.priority = priority;
        this.categoryDepartment = categoryDepartment;
        this.category = category;
        this.bytes = bytes;
        this.assignTo = assignTo;
        this.createdOn = LocalDate.now();
        this.subscribers = new LinkedHashSet<>();
        this.upVote = 0;

        this.statusHistory = new ArrayList<String>();
        statusHistory.add(status);
    }

    public ArchiveReports( String reporterId, String reporterName,String title, String description, String location, boolean closeTo, String campus,String floor, String status, String priority,String categoryDepartment, String category,User assignTo  ) {
        this.reporterId = reporterId;
        this.reporterName = reporterName;
        this.title = title;
        this.description = description;
        this.location = location;
        this.closeTo = closeTo;
        this.campus = campus;
        this.floor = floor;
        this.status = status;
        this.priority = priority;
        this.categoryDepartment = categoryDepartment;
        this.category = category;
        this.assignTo = assignTo;
        this.createdOn = LocalDate.now();
        this.subscribers = new LinkedHashSet<>();
        this.upVote = 0;

        this.statusHistory = new ArrayList<String>();
        statusHistory.add(status);
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public String getReporterName() {
        return reporterName;
    }

    public void setReporterName(String reporterName) {
        this.reporterName = reporterName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isCloseTo() { return closeTo; }

    public void setCloseTo(boolean closeTo) { this.closeTo = closeTo; }

    public String getCampus() {
        return campus;
    }

    public void setCampus(String campus) {
        this.campus = campus;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getStatusHistory() {
        return statusHistory;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public byte[] getBytes() {
        return bytes;
    }

    public String getReporterId() {
        return reporterId;
    }

    public void setReporterId(String reporterId) {
        this.reporterId = reporterId;
    }

    public User getAssignTo() {
        return assignTo;
    }

    public void setAssignTo(User assignTo) {
        this.assignTo = assignTo;
    }

    public void setBytes(byte[] bytes) {
        this.bytes = bytes;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public int getUpVote() { return upVote; }

    public void setUpVote() { this.upVote = this.subscribers.size(); }

    public Set<String> getSubscribers() { return subscribers; }

    public void addSubscriber(String id) { this.subscribers.add(id); }
    public void removeSubscriber(String id) { this.subscribers.remove(id); }
    public boolean searchSubscriber(String id) { return this.subscribers.contains(id);}

    public String getCategoryDepartment() {
        return categoryDepartment;
    }

    public void setCategoryDepartment(String categoryDepartment) {
        this.categoryDepartment = categoryDepartment;
    }
}
